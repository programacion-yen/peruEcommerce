import React,{useState} from 'react';
import useLogin from '/hooks/useLogin'
import useProducts from '/hooks/useProducts';
import allServices from '/services/allServices'
import {Form} from 'antd';
import { Success, Warning } from '/utils/Notificaciones';
import FormRespuesta from '/components/elements/detail/description/formRespuesta';
import Comment from '/components/elements/detail/description/Comment'

const PartialOffer = ({questions,code}) => {
    let data = questions != null ? questions : []
    let numberQuestions = questions != null ? questions.length : 0;
    let questionNumber = numberQuestions >= 1
    const {isLogged} = useLogin()
    const [form] = Form.useForm();
    const {refreshHook} = useProducts()
    const [activeComment, setActiveComment] = useState(null);
    let currentUserId
    for (let index = 0; index < data.length; index++) {
        data[index].parentId = null
        currentUserId = data[index].correlativo
    }
    const rootComments = data.filter(
        (item) => item.parentId === null
      );
    const getReplies = (commentId) =>
    data
      .filter((item) => item.correlativo === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    const validationForm = async (e,replyId) => {
        let temp
        if (isLogged) {
            if (e.question != undefined) {
                temp ={
                    "idArticulo": code,
                    "texto": e.question
                }
            }else if (e.answer != undefined){
                temp ={
                    "idArticulo": code,
                    "texto": e.answer,
                    "correlativo": replyId
                }
            }
        }
  
        let res = await allServices.postQuestionAndAnswert(temp);
        if (res.status === 200) {
            form.resetFields();
            Success('Creado exitosamente!')
            setActiveComment(null);
            refreshHook(true)
        }else{
            Warning('No se pudo crear');
        }
    }

    return (
    <>
        {
            isLogged &&
                <FormRespuesta
                    validationForm={validationForm}
                    submitLabel="Enviar Pregunta"
                    butonClass="ps-btn"
                    name="question"
                    title="Pregunta"
                    form={form}
                />
        }
        {
            questionNumber &&
                <>
                    <div className="pt-5 Reviews">
                        <h6>Pregunta y Respuestas</h6>
                    </div>
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 420,
                            overflow: 'auto',
                        }}
                    >
                    {
                        rootComments.map((rootComment) => (
                        <div key={rootComment.correlativo}>
                            <Comment
                                key={rootComment.correlativo}
                                comment={rootComment}
                                replies={getReplies(rootComment.correlativo)}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                validationForm={validationForm}
                                form={form}
                                currentUserId={currentUserId} 
                            />
                            <hr />
                        </div>
                    ))}
                    </div>
                </>
        }
    </>
)
}

export default PartialOffer;
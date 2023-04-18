import React,{useState,useEffect} from 'react';
import { Rate,Form,Input,List,Progress} from 'antd';
import { Success, Warning } from '/utils/Notificaciones';
import allServices from '/services/allServices'
import useLogin from '/hooks/useLogin'
import useProducts from '/hooks/useProducts';
import Rating from '/components/elements/Rating';
import PatialComments from '/components/elements/detail/description/PatialComments'

const { TextArea } = Input;

const PartialReview = ({raking,comment,code}) => {
    let numberOpinion = comment != null ? comment.length : 0;
    let commentsNumber = numberOpinion >= 1
    const {isLogged} = useLogin()
    const [validation, setValidation] = useState(true)
    const {refreshHook} = useProducts()
    const [form] = Form.useForm();
    const [likes, setlikes] = useState(null);
    const [dislikes, setdislikes] = useState(null);
    const [rootComments, setRootComments] = useState(null);
    let currentUserId;

    useEffect(() => {
        if(comment) {
            for (let index = 0; index < comment.length; index++) {
                comment[index].parentId = null
                currentUserId = comment[index].correlativo
            }
            
            setRootComments( comment.filter((item) => item.parentId === null) );
        }
    },[comment])
    
    const getReplies = (commentId) => comment.filter((item) => item.correlativo === commentId)

    let stars;
    let arrayRating = [
        { id: 1,star : raking != null ? raking.estrella_1 : 0},
        { id: 2,star : raking != null ? raking.estrella_2 : 0},
        { id: 3,star : raking != null ? raking.estrella_3 : 0},
        { id: 4,star : raking != null ? raking.estrella_4 : 0},
        { id: 5,star : raking != null ? raking.estrella_5 : 0},
    ];

    {raking && raking.length > 0
        arrayRating.reverse()
        // const total = raking ? raking.total : 1;
        stars = arrayRating.map((item,key) => {
            const result = raking ? ( item.star / raking.total ) * 100 : 0;
            return <div className="ps-block__star" key={key}>
                <span className="mr-5">{item.id} Estrella</span>
                <Progress percent={result} format={percent => `${item.star}`}/>
            </div>
        })
    }

    const validationForm = async (e) => {
        let temp
        if (isLogged) {
            temp ={
                "idArticulo": code,
                "comentario": e.comment,
                "puntuacion": JSON.stringify(e.points)
            }
        }else{
            temp ={
                "idArticulo": code,
                "comentario": e.comment,
                "puntuacion": JSON.stringify(e.points),
                "nombre": e.firstName,
                "eMail": e.email
            }
        }

        let res = await allServices.postComments(temp);
        if (res.status === 200) {
            form.resetFields();
            Success('Comentario enviado con exito')
            setlikes(null)
            setdislikes(null)
            refreshHook(true)
        }else{
            Warning('No se pudo enviar el comentario : ' + res);

        }
    }

    const onFinishFailed = () => {
        if (!isLogged) {
            setValidation(false)
        }
    };

    const validationLikesandDislikes = async (e,replyId) => {
        let temp
        if (isLogged) {
            temp ={
                "idArticulo": code,
                "correlativo": replyId,
                "tipo":e
            }
        }

        let res = await allServices.postCommentslike(temp);
        if (res.status === 200) {
            form.resetFields();
            Success('Exito')
            setlikes(null)
            setdislikes(null)
            refreshHook(true)
        }else{
            Warning('No se pudo enviar : ' + res);
        }
    }

    return (
        <div className="row">
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
                <div className="ps-block--average-rating">
                    <div className="ps-block__header">
                        <h3>{raking != null ? raking.puntuacionfinal : 0}</h3>
                        <span>Promedio entre {raking != null ? raking.total : 0} opiniones</span>
                    </div>
                    {stars}
                </div>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
                <Form className="ps-form--review" onFinish={validationForm} onFinishFailed={onFinishFailed} form={form}>
                    <h4>ENVÍE SU OPINIÓN</h4>
                    <p>
                        Su dirección de correo electrónico no será publicada.
                    </p>
                    <div className="form-group form-group__rating">
                        <label>Su calificación de este producto</label>
                        <Form.Item
                            name="points"
                            className="m-0"
                            rules={[
                                {
                                    required: true,
                                    message: 'Campo obligatorio',
                                },
                            ]}>
                            <Rate initialValue={0} />
                        </Form.Item>
                    </div>
                    <div className="form-group">
                        <Form.Item
                            name="comment"
                            rules={[
                                {
                                    required: true,
                                    message: 'Campo obligatorio',
                                },
                            ]}>
                            <textarea
                                className="form-control"
                                rows="6"
                                placeholder="Escribe tu Opinión Aquí">
                            </textarea>
                        </Form.Item>
                    </div>
                    {!isLogged &&
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                                <div className="form-group">
                                    <Form.Item
                                        name="firstName"
                                        rules={[
                                            {
                                                required: {validation},
                                                message: 'Campo obligatorio',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Nombre"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                                <div className="form-group">
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: {validation},
                                                message: 'Campo obligatorio',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Correo electrónico"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    }
                    <Form.Item className="m-0">
                        <button types="submit" className="ps-btn btn-lg">Enviar Opinión</button>
                    </Form.Item>
                </Form>
            </div>
            {commentsNumber && rootComments &&
                <div className="col-12">
                    <div className="pt-5 Reviews">
                        <h6>{numberOpinion} {commentsNumber ? 'Comentarios' : 'Comentario'}</h6>
                    </div>
                    <List
                        dataSource={rootComments}
                        pagination={{pageSize: 3,showSizeChanger: false,responsive:true}}
                        itemLayout="vertical"
                        renderItem={item => (
                        <List.Item>
                            <>
                            <PatialComments
                                key={item.correlativo}
                                comment={item}
                                replies={getReplies(item.correlativo)}
                                likes={likes}
                                dislikes={dislikes}
                                setdislikes={setdislikes}
                                setlikes={setlikes}
                                validationLikesandDislikes={validationLikesandDislikes}
                                form={form}
                                currentUserId={currentUserId} /><hr />
                            </>
                        </List.Item>
					)}
				/>
                </div>
            }
        </div>
    )
}


export default PartialReview;

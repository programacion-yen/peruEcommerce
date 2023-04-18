import React from 'react'
import FormRespuesta from '/components/elements/detail/description/formRespuesta';
import { Avatar,Comment } from 'antd';
import {UserOutlined} from '@ant-design/icons'

const Comentario = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  form,
  validationForm,
  parentId = null,
  currentUserId,
}) => {
  const isReplying =
    activeComment &&
    activeComment.id === comment.correlativo &&
    activeComment.type === "replying";
  const canReply = comment.siresponder != '0';
  const replyId = parentId ? parentId : comment.correlativo;
  return (
    <div key={comment.correlativo} className="comment">
      <div className="comment-image-container">
      <Avatar icon={<UserOutlined />} />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
            {comment.lineacorrelativo.map((item => (
                <div key={item.linea}>
                    <div className="comment-author">{item.nombre}</div>
                    <div className="comment-text text-muted mb-3">{item.texto}</div>
                </div>
            )))}
        </div>
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.correlativo, type: "replying" })
              }
            >
              Responder
            </div>
          )}
        </div>
        {isReplying && (
          <FormRespuesta
            submitLabel="Enviar Respuesta"
            butonClass="ps-btn-yellow"
            name="answer"
            title="Respuesta"
            form={form}
            validationForm={(text) => validationForm(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.correlativo}
                // setActiveComment={setActiveComment}
                // activeComment={activeComment}
                // validationForm={validationForm}
                // parentId={comment.id}
                replies={[]}
                // currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comentario;

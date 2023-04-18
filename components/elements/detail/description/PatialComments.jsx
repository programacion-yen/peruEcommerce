import React from 'react'
import { Rate, Avatar} from 'antd';
import {UserOutlined,DislikeOutlined,LikeOutlined,DislikeFilled, LikeFilled} from '@ant-design/icons'

const PatialComments = ({
  comment,
  likes,
  dislikes,
  setdislikes,
  setlikes,
  validationLikesandDislikes,
  parentId = null,
}) => {
  const isLikes =
    likes &&
    likes.id === comment.correlativo &&
    likes.type === "likes";
  const isDisLikes =
    dislikes &&
    dislikes.id === comment.correlativo &&
    dislikes.type === "dislikes";
  const replyId = parentId  ? parentId : comment.correlativo;
  return (
    <div key={comment.correlativo} className="comment">
      <div className="comment-image-container">
      <Avatar icon={<UserOutlined />} />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
            {comment.lineacorrelativo.map(((item, key) => (
                <div className="row" key={key}>
                    <div className="col-12">
                        <Rate value={comment.puntuacion} disabled/>
                        <p>{item.nombre}  -  {comment.fechahora} </p>
                        <p className="">{item.comentario}</p>
                    </div>
                </div>
            )))}
        </div>
        <div className="comment-actions">
            {comment.likes > 0 ?
                <LikeFilled
                id="like"
                className="comment-action text-primary"
                onClick={() => {
                    setlikes({ id: comment.correlativo, type: "likes" })
                    validationLikesandDislikes(1, replyId)
                }}/>
            :
            <LikeOutlined
                className="comment-action"
                onClick={() => {
                    setlikes({ id: comment.correlativo, type: "likes" })
                    validationLikesandDislikes(1, replyId)
                }}
            />
            }
            {comment.likes}
            {comment.dislike > 0 ?
            <DislikeFilled
                id="dislike"
                className="comment-action pl-4 text-secondary"
                onClick={() =>{
                    setdislikes({ id: comment.correlativo, type: "dislikes" })
                    validationLikesandDislikes(0, replyId)
                }}
            />
            :
            <DislikeOutlined
                id="dislike"
                className="comment-action pl-4"
                onClick={() =>{
                    setdislikes({ id: comment.correlativo, type: "dislikes" })
                    validationLikesandDislikes(0, replyId)
                }}
            />
            }
            {comment.dislike}
        </div>
      </div>
    </div>
  );
};

export default PatialComments;

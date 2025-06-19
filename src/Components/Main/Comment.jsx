import React from "react";
import "./Comment.css";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <img src={comment.userImage} alt="" className="comment-avatar" />
      <div className="comment-content">
        <h4 className="comment-author">{comment.username}</h4>
        <p className="comment-text">{comment.text}</p>
      </div>
    </div>
  );
};


export default Comment;

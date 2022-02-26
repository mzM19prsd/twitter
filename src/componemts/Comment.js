import React, { useState } from "react";
import { dbService } from "../fbase";
import CommentContent from "./CommentContent";

export default function Comment({ User, comments, tweetID }) {
  const [NewComment, setNewComment] = useState("");
  
  const onChangeComment = (e) => {
    setNewComment(e.target.value);
  };
  
  const submitComment = async (e) => {
      e.preventDefault();
    await dbService.collection("comments").add({
      commenter: User.displayName,
      photoURL: User.photoURL,
      commenterID: User.uid,
      commentOn: tweetID,
      comment: NewComment,
      commentAt: Date.now(),
    });
  };

  return (
    <details>
      <summary>
        <i className="bx bx-message-rounded-dots"></i> {comments.length}
      </summary>
      <form onSubmit={submitComment}>
        <input
          type="text"
          value={NewComment}
          onChange={onChangeComment}
        ></input>
        <input type="submit" value="답글"></input>
      </form>
      <ul>
        {comments.map((comment) => (
          <CommentContent key={comment.id} comment={comment} iscommenter={comment.commenterID===User.uid} />
        ))}    
      </ul>
    </details>
  );
}

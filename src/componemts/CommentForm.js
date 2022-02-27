import React, { useState } from "react";
import { dbService } from "../fbase";

export default function CommentForm({User, tweetID}) {
  const [NewComment, setNewComment] = useState("");
  
  const onChangeComment = (e) => {
    setNewComment(e.target.value);
  };
  
  const submitComment = async (e) => {
      e.preventDefault();
    if(NewComment !== ""){
      await dbService.collection("comments").add({
        commenter: User.displayName,
        photoURL: User.photoURL,
        commenterID: User.uid,
        commentOn: tweetID,
        comment: NewComment,
        commentAt: Date.now(),
      });
      setNewComment("")
    }
  };

  return (
    <div>
       <form onSubmit={submitComment}>
        <input
          type="text"
          value={NewComment}
          onChange={onChangeComment}
          minLength="2"
        ></input>
        <input type="submit" value="reply"></input>
      </form>
    </div>
  );
}

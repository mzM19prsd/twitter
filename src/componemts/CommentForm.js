import { Timestamp } from "firebase/firestore";
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
        commentedAt: Timestamp.now().toDate().toLocaleString(),
      });
      setNewComment("")
    }
  };

  return (
    <div className="tweet">
      <div className="Sec1">
      <img className="profilePic" src={User.photoURL} alt="user" />
      </div>
      <div className="Sec2">
      <form onSubmit={submitComment} className="tweet-form">
        <textarea
          value={NewComment}
          onChange={onChangeComment}
        ></textarea>
        <div style={{textAlign:'end'}}>
        <button className="blue-btn" type="submit" value="reply" style={{marginBottom:'0.5rem'}}>
          Comment
          </button>
        </div>
      </form>
      </div>
      
    </div>
  );
}

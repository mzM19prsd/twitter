import React from "react";
import { dbService } from "../fbase";

export default function Comment({ c, isCommenter }) {
  const onDel = async () => {
    const ok = window.confirm("Are you sure you want yo delete this comment?");
    if (ok) {
      await dbService.doc(`comments/${c.id}`).delete();
    } else {
      return;
    }
  };
  return (
    <div className="tweet">
      <div className="Sec1">
        <img className="profilePic" src={c.photoURL} alt="commenterPhoto" />
      </div>
      <div className="Sec2">
       <div className="flex-btw">
       {c.commenter}
        {isCommenter && (
          <button onClick={onDel} className="comment-del-btn">
            <i className="bx bx-trash"></i>
          </button>
        )}
       </div>
        <p>{c.comment}</p>
       <div className="c-date"> {c.commentedAt}</div>
      </div>
    </div>
  );
}

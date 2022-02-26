import React, { useState } from 'react'
import { dbService } from '../fbase';
import { doc, updateDoc } from "firebase/firestore";

export default function CommentContent({comment, iscommenter}) {
  
    const onDel = async () => {
        const ok = window.confirm("Are you sure you want yo delete this comment?");
        if (ok) {
          await dbService.doc(`comments/${comment.id}`).delete();
        } else {
          return
        }
      };

  return (
    <li>
      {comment.commenter}
      {comment.comment}
    {iscommenter && <button onClick={onDel}><i className='bx bx-trash' ></i></button>}
     </li>
  )
}

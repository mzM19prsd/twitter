import React, { useState } from 'react'
import { dbService } from '../fbase';
import { doc, updateDoc } from "firebase/firestore";

export default function CommentContent({content}) {
  
    const onDel = async () => {
        const ok = window.confirm("Are you sure you want yo delete this comment?");
        if (ok) {
          await dbService.doc(`comments/${content.id}`).delete();
        } else {
          return;
        }
      };

      

  return (
    <li>{content.comment}
    
      <button onClick={onDel}><i className='bx bx-trash' ></i></button> </li>
  )
}

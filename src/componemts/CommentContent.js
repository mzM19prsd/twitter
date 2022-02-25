import React, { useState } from 'react'
import { dbService } from '../fbase';
import { doc, updateDoc } from "firebase/firestore";

export default function CommentContent({content}) {
    const [newComment, setnewComment] = useState('')

    const onChangeNewComment=(e)=>{setnewComment(e.target.value)}
    const submitNewComment=async(e)=>{
        e.preventDefault();
         await updateDoc(doc(dbService, `comments/${content.id}`), {
           comment:newComment,
         })
          }

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
     <form onSubmit={submitNewComment}>
     <input type='text' value={newComment} onChange={onChangeNewComment}></input>
     <input type='submit' value='eidt'></input>
     </form>
      <button onClick={onDel}>del</button> </li>
  )
}

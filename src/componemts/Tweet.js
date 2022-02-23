import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";

export default function Tweet({ tweet, isOwner }) {
  const [onEdit, setonEdit] = useState(false)
  const [newTweet, setnewTweet] = useState(tweet.text)
  
  const onDel = async () => {
    const ok = window.confirm("Are you sure you want yo delete this tweet?");
    if (ok) {
      await dbService.doc(`tweets/${tweet.id}`).delete();
      await storageService.refFromURL(tweet.imgFileSrc).delete()
    } else {
      return;
    }
  };
  
  const onEditToggle=()=>{setonEdit(!onEdit)}
  const onChangeNewTweet=(e)=>{setnewTweet(e.target.value)}
  const submitTweet=async(e)=>{
e.preventDefault();
 await updateDoc(doc(dbService, `tweets/${tweet.id}`), {
   text:newTweet,
 })
setonEdit(false)
  }

  return (
    <div className="tweet">
      
     {onEdit ? <form onSubmit={submitTweet}>
      <textarea onChange={onChangeNewTweet} value={newTweet} rows='3' cols='30'></textarea>
      <button type="submit">tweet</button>
     </form> : 
     <p>{tweet.text}</p>
     
     }
     {tweet.imgFileSrc && <img width='100%' src={tweet.imgFileSrc} />}
      <div>
        <ul className="tweetOptions">
          <li>coments</li>
          {isOwner ?
          <>
          <li><button onClick={onDel}>delete</button></li>
          <li><button onClick={onEditToggle}>{onEdit ? 'cancel' : 'Edit'}</button></li>
          </> :
          <>
          <li>block</li>
          </>
          }
        </ul>
      </div>
     
    </div>
  );
}

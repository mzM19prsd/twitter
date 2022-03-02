import React, { useEffect, useState } from "react";
import { dbService, storageService } from "../fbase";
import { doc, orderBy, updateDoc, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { collection, getDocs, query } from "@firebase/firestore";

export default function Tweet({ tweet, isOwner }) {
  const [onEdit, setonEdit] = useState(false);
  const [newTweet, setnewTweet] = useState(tweet.text);
  const [comments, setcomments] = useState([]);

  const getComments = async () => {
    const q = query(
      collection(dbService, "comments"),
      where("commentOn", "==", `${tweet.id}`),
    );
    const querySnapshot = await getDocs(q);
    let getdata = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setcomments(getdata);
  };

  useEffect(() => {
    getComments();
  }, []);

  const onDel = async () => {
    const ok = window.confirm("Are you sure you want yo delete this tweet?");
    if (ok) {
      await dbService.doc(`tweets/${tweet.id}`).delete();
      await storageService.refFromURL(tweet.imgFileSrc).delete();
    } else {
      return;
    }
  };

  const onEditToggle = () => {
    setonEdit(!onEdit);
  };

  const onChangeNewTweet = (e) => {
    setnewTweet(e.target.value);
  };

  const submitTweet = async (e) => {
    e.preventDefault();
    await updateDoc(doc(dbService, `tweets/${tweet.id}`), {
      text: newTweet,
    });
  };

  return (
    <div className="tweet">
      <div className="Sec1">
        <img
          className="profilePic"
          src={tweet.creatorPhoto}
          alt="creatorPhoto"
        />
      </div>
      <div className="Sec2">
        
        <div className="flex-btw">
          {tweet.creatorName}
          {isOwner && (
            <div>
             <span className="boxBtn mr-8p" onClick={onEditToggle}>
              {onEdit ? <span><i className='bx bx-x'></i> cancel</span> :
               <span><i className='bx bx-edit' ></i> edit</span> }
            </span>
            <span className="boxBtn"
             onClick={onDel}><i className='bx bx-trash' ></i> delete
             </span>
            </div>
          )}
         
        </div>
        {onEdit ? (
          <form className="tweet-form" onSubmit={submitTweet}>
            <textarea onChange={onChangeNewTweet} value={newTweet}></textarea>
           <div className="text-end">
           <button className="blue-btn" type="submit">Tweet</button>
           </div>
          </form>
        ) : (
          <Link to={`/tweet=${tweet.id}`}>
            <p>{tweet.text}</p>
          </Link>
        )}
        {tweet.imgFileSrc && (
          <img className="tweetIMG" src={tweet.imgFileSrc} alt="tweetIMG" />
        )}
        <div>
          <Link to={`/tweet=${tweet.id}`}>
            commetns {comments && comments.length}{" "}
          </Link>
        </div>
        </div>
      
    </div>
  );
}

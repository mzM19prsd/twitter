import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Tweet({ tweet, comments, User, isOwner }) {
  const [onEdit, setonEdit] = useState(false);
  const [newTweet, setnewTweet] = useState(tweet.text);

  let thisComments = comments.filter((c) => c.commentOn === tweet.id);

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
        <div>
          {tweet.creatorName}
          {isOwner ? (
            <>
              <span>
                <button onClick={onDel}>
                  <i className="bx bx-trash"></i>
                </button>
              </span>
              <span>
                <button onClick={onEditToggle}>
                  {onEdit ? "cancel" : <i className="bx bx-edit"></i>}
                </button>
              </span>
            </>
          ) : (
            ""
          )}
        </div>
        {onEdit ? (
          <form onSubmit={submitTweet}>
            <textarea onChange={onChangeNewTweet} value={newTweet}></textarea>
            <button type="submit">tweet</button>
          </form>
        ) : (
          <Link to={`/tweet=${tweet.id}`}>
            {" "}
            <p>{tweet.text}</p>{" "}
          </Link>
        )}
        {tweet.imgFileSrc && (
          <img className="tweetIMG" src={tweet.imgFileSrc} alt="tweetIMG" />
        )}
        <div>
          {" "}
          <Link to={`/tweet=${tweet.id}`}>commetns {thisComments.length}</Link>
        </div>
      </div>
    </div>
  );
}

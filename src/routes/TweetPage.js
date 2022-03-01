import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Comment from "../componemts/Comment";
import CommentForm from "../componemts/CommentForm";
import { dbService, storageService } from "../fbase";

export default function TweetPage() {
  const [User, setUser] = useOutletContext();
  const [pageTweet, setpageTweet] = useState([]);
  const [pageComment, setpageComment] = useState([]);
  const [onEdit, setonEdit] = useState(false);
  const [newTweet, setnewTweet] = useState('');
  
  let params = useParams();

  const onDel = async () => {
    const ok = window.confirm("Are you sure you want yo delete this tweet?");
    if (ok) {
      await dbService.doc(`tweets/${params.tweetID}`).delete();
      await storageService.refFromURL(pageTweet.imgFileSrc).delete();
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
    await updateDoc(doc(dbService, `tweets/${params.tweetID}`), {
      text: newTweet,
    });
  };

  useEffect(() => {
    dbService
      .collection("tweets")
      .doc(params.tweetID)
      .onSnapshot((snapshot) => {
        const tweetArr = snapshot.data();
        setpageTweet(tweetArr);
        setnewTweet(tweetArr.text)
      });
    dbService
      .collection("comments")
      .where("commentOn", "==", `${params.tweetID}`)
      .onSnapshot((snapshot) => {
        const commentArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setpageComment(commentArr);
      });
  }, []);

  return (
    <div>
      <div>{"<--"} Tweet</div>
      <div className="tweet">
        <div className="Sec1">
          <img
            className="profilePic"
            src={pageTweet.creatorPhoto}
            alt="creatorPhoto"
          />
        </div>

        <div className="Sec2">
          <div className="flex-btw">
          <strong> {pageTweet.creatorName}</strong>
          {User.uid === pageTweet.creatorID ? (
            <div>
                <span className="boxBtn mr-8p" onClick={onEditToggle}>
                  {onEdit ? <span><i className='bx bx-x'></i> cancel</span>  :
                   <span><i className='bx bx-edit' ></i> edit</span>}
                </span>
                <span className="boxBtn" onClick={onDel}>
                  <i className="bx bx-trash"></i> delete
                </span>
            </div>
          ) : (" ")}
          </div>
          {onEdit ? (
          <form  onSubmit={submitTweet} className="tweet-form">
            <textarea onChange={onChangeNewTweet} value={newTweet}></textarea>
            <div className="text-end">
           <button className="blue-btn" type="submit">Tweet</button>
           </div>
          </form>
        ) : (
         <p>{pageTweet.text}</p>
        )}
        
          {pageTweet.imgFileSrc && (
            <img
              className="tweetIMG"
              src={pageTweet.imgFileSrc}
              alt="tweetIMG"
            />
          )}
        </div>
      </div>

      <div>comments {pageComment.length}</div>
      <CommentForm User={User} tweetID={params.tweetID} />

      {pageComment &&
        pageComment.map((comment) => (
          <Comment key={comment.id} c={comment} isCommenter={User.uid === comment.commenterID} />
        ))}
    </div>
  );
}

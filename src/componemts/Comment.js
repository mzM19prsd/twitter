import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, getDocs, query, where } from "@firebase/firestore";
import CommentContent from "./CommentContent";

export default function Comment({ tweetID, User }) {
  const [comments, setcomments] = useState([]);
  const [NewComment, setNewComment] = useState("");

  const getComments = async () => {
    const q = query(
      collection(dbService, "comments"),
      where("commentOn", "==", `${tweetID}`)
    );
    const querySnapshot = await getDocs(q);
    let getdata = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setcomments(getdata);
  };

  const onChangeComment = (e) => {
    setNewComment(e.target.value);
  };
  const submitComment = async (e) => {
    e.preventDefault();
    await dbService.collection("comments").add({
      commenter: User.displayName,
      photoURL: User.photoURL,
      commenterID: User.uid,
      commentOn: tweetID,
      comment: NewComment,
      commentAt: Date.now(),
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <details>
      <summary><i class='bx bx-message-rounded-dots'></i> {comments.length}</summary>
      <form onSubmit={submitComment}>
        <textarea value={NewComment} onChange={onChangeComment}></textarea>
        <input type="submit" value="답글"></input>
      </form>
      <ul>
        {comments.map((comment) => (
          <CommentContent key={comment.id} content={comment} />
        ))}
      </ul>
    </details>
  );
}

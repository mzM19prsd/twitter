import { dbService, storageService } from "../fbase";
import React, { useRef, useState } from "react";
import { Timestamp } from "firebase/firestore";

export default function TweetForm({ User }) {
  const [tweet, settweet] = useState("");
  const [imgFile, setimgFile] = useState("");
  const fileInput = useRef();
  
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const thefile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const src = finishedEvent.currentTarget.result;
      setimgFile(src);
    };
    reader.readAsDataURL(thefile);
  };

  const clearImg = () => {
    setimgFile(null);
    fileInput.current.value = null;
  };

  const submitTweet = async (e) => {
    e.preventDefault();
    
    let imgFileSrc = "";
    if (imgFile !== "") {
      const fileRef = storageService.ref().child(`${User.uid}/${Date.now()}`);
      const response = await fileRef.putString(imgFile, "data_url");
      imgFileSrc = await response.ref.getDownloadURL();
    }else if(tweet.length < 2){ return}
    await dbService.collection("tweets").add({
      creatorID: User.uid,
      creatorName: User.displayName,
      creatorPhoto: User.photoURL,
      text: tweet,
      imgFileSrc: imgFileSrc,
      createdAt:  Timestamp.now().toDate().toLocaleString(),
    });
    settweet("");
    setimgFile("");
  };

  return (
    <div className="tweet">
      <div className="Sec1">
        <img className="profilePic" src={User.photoURL} alt="user" />
      </div>
      <div className='Sec2'>
      <form onSubmit={submitTweet} className="tweet-form">
      <textarea
        onChange={(e) => {settweet(e.target.value);}}
        placeholder="What's happening?"
        value={tweet}
      ></textarea>
      <div className="tweet-option">
      <label htmlFor="tweetIMGInput" id="tweetIMGLabel" ><i className='bx bx-image'></i></label>
        <input id="tweetIMGInput"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        ></input>
        {imgFile && (
          <div className="prevIMG">
            <img src={imgFile} alt="uploadImg" />
            <button onClick={clearImg}>clear</button>
          </div>
        )}
        <button className="blue-btn" type="submit">Tweet</button>
      </div>
    </form>
      </div>
    </div>
  );
}

import { dbService, storageService } from "../fbase";
import React, { useRef, useState } from "react";

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
    }
    await dbService.collection("tweets").add({
      creatorID: User.uid,
      creatorName: User.displayName,
      creatorPhoto: User.photoURL,
      text: tweet,
      imgFileSrc: imgFileSrc,
      createdAt: Date.now(),
    });
    settweet("");
    setimgFile("");
  };

  return (
    <div className="tweet">
      <div className="Sec1">
        <img className="profilePic" src={User.photoURL} />
      </div>
      <form onSubmit={submitTweet} className='Sec2'>
      <textarea
        onChange={(e) => {settweet(e.target.value);}}
        placeholder="무슨 일이 일어나고 있나요?"
        value={tweet}
      ></textarea>
      <div className="flex-btw">
      <label for="tweetIMGInput" id="tweetIMGLabel" ><i className='bx bx-image'></i></label>
        <input id="tweetIMGInput"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        ></input>
        {imgFile && (
          <div>
            <img src={imgFile} width="50px" maxheight="50px" alt="uploadFile" />
            <button onClick={clearImg}>clear</button>
          </div>
        )}
        <button type="submit">tweet</button>
      </div>
    </form>
    </div>
  );
}

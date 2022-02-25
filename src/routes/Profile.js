/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { authService, dbService, storageService } from "../fbase";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { doc } from "firebase/firestore";

export default function Profile() {
  const [User, setUser] = useState(authService.currentUser);
  const [userTweets, setuserTweets] = useState([]);
  const [newDisplayName, setnewDisplayName] = useState("");
  const [newPhotoURL, setnewPhotoURL] = useState("");

  const getTweets = async () => {
    const q = query(
      collection(dbService, "tweets"),
      where("creatorID", "==", `${User.uid}`)
    );
    const querySnapshot = await getDocs(q);
    let getdata = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setuserTweets(getdata);
  };

  useEffect(() => {
    getTweets();
  }, []);

  const newName = (e) => {
    setnewDisplayName(e.target.value);
  };

  const newPhoto = async (e) => {
    const thefile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const src = finishedEvent.currentTarget.result;
      setnewPhotoURL(src);
    };
    reader.readAsDataURL(thefile);
  };

  const onSubmitName = async () => {
    if (User.displayName !== newDisplayName) {
      await User.updateProfile({
        displayName: newDisplayName,
      });
    }
  };

  const onSubmitPhoto = async (e) => {
    e.preventDefault();
    let imgFileSrc = "";
    if (newPhotoURL !== "") {
      const fileRef = storageService.ref().child(`${User.uid}/${Date.now()}`);
      const response = await fileRef.putString(newPhotoURL, "data_url");
      imgFileSrc = await response.ref.getDownloadURL();
      await User.updateProfile({
        photoURL: imgFileSrc,
      });
    }
  };
  console.log(userTweets.length);
  return (
    <div>
      <h3>
        {User && <img src={User.photoURL} alt={User.displayName} />}
        {User && User.displayName}
      </h3>
      <form onSubmit={onSubmitName}>
        <input
          type="text"
          onChange={newName}
          value={newDisplayName}
          minLength="2"
        ></input>
        <input type="submit" value="이름 변경"></input>
      </form>
      <form onSubmit={onSubmitPhoto}>
        <input type="file" onChange={newPhoto} accept="image/*"></input>
        <input type="submit" value="프로필 사진 변경"></input>
      </form>
      <ul>
        {userTweets &&
          userTweets.map((tweet) => (
            <li key={tweet.id}>
              <p>{tweet.text}</p>
              {tweet.imgFileSrc && (
                <img
                  className="tweetIMG"
                  src={tweet.imgFileSrc}
                  alt={tweet.text}
                />
              )}
            </li>
          ))}
        {userTweets.length === 0 && <li> 트윗이 없습니다</li>}
      </ul>
    </div>
  );
}

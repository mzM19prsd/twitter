import React, { useEffect, useRef, useState } from "react";
import { authService, dbService, storageService } from "../fbase";
import { collection, getDocs, query, where, orderBy } from "@firebase/firestore";
import Tweet from "../componemts/Tweet";

export default function Profile() {
  const [User, setUser] = useState(authService.currentUser);
  const [onEditName, setonEditName] = useState(false);
  const [onEditPhoto, setonEditPhoto] = useState(false);
  const [userTweets, setuserTweets] = useState([]);
  const [newDisplayName, setnewDisplayName] = useState("");
  const [newPhotoURL, setnewPhotoURL] = useState("");
  const fileInput = useRef();

  const getTweets = async () => {
    const q = query(
      collection(dbService, "tweets"),
      where("creatorID", "==", `${User.uid}`),
      orderBy("createdAt", "desc"),
      
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

  function editNameToggle() {
    setonEditName(!onEditName);
  }
  function editPhotoToggle() {
    fileInput.current.value = null;
    setnewPhotoURL(null);
    setonEditPhoto(!onEditPhoto);
  }
  const newName = (e) => {
    setnewDisplayName(e.target.value);
  };

  const newPhoto = async (e) => {
    setonEditPhoto(true);
    if (e.target.files[0].size < 600000) {
      const thefile = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const src = finishedEvent.currentTarget.result;
        setnewPhotoURL(src);
      };
      reader.readAsDataURL(thefile);
    } else {
      fileInput.current.value = null;
      setnewPhotoURL(null);
      return alert("Upload files under 600kb");
    }
  };

  const onSubmitName = async (e) => {
    e.preventDefault();
    if (User.displayName === newDisplayName || newDisplayName.length < 2) {
      return alert("Please enter another name");
    } else {
      await User.updateProfile({
        displayName: newDisplayName,
      });
      window.location.reload();
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
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="profile-top">
        <div className="box-wrap">
          <img className="box" src={User.photoURL} alt={User.displayName} />
          <label htmlFor="porfileIMGInput" id="porfileIMGLabel">
            <i className="bx bxs-camera-plus"></i>
          </label>
        </div>
        <div>
          <h3>
            {onEditName ? (
              <form onSubmit={onSubmitName} style={{marginBottom:'0.5rem'}}>
                <input id="proileNameInput"
                  type="text"
                  onChange={newName}
                  value={newDisplayName}
                  minLength="2"
                ></input>
                <input className="black-btn"
                type="submit" value="Save"></input>
              </form>
            ) : (
              <span style={{marginRight:'1rem'}}>{User.displayName}</span>
            )}
            <span className="boxBtn" onClick={editNameToggle}>
              {onEditName ? <span><i className='bx bx-x'></i> cancel</span> :
                <span><i className='bx bx-edit' ></i> edit</span> 
                }
            </span>
          </h3>
          <form className="" onSubmit={onSubmitPhoto}>
            <input
              id="porfileIMGInput"
              type="file"
              accept="image/*"
              ref={fileInput}
              onChange={newPhoto}
              className={`mb-1 ${onEditPhoto ? "none" : "Btn-hide"}`}
            ></input>
            {newPhotoURL && <input className="black-btn" type="submit" value="Save"></input>}
            <div>
              <span className="boxBtn" onClick={editPhotoToggle}>
                {onEditPhoto ? <span><i className='bx bx-x'></i> cancel</span> :
                 "Change profile photo"}
              </span>
            </div>
          </form>
        </div>
      </div>

      <div>
        {userTweets && userTweets.map((tweet)=>(
          <Tweet key={tweet.id} tweet={tweet} isOwner={true}/>
        ))}
        </div>        
    </div>
  );
}

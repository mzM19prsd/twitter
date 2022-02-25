import React, { useEffect, useState } from 'react'
import { dbService, storageService } from '../fbase'
import Tweet from '../componemts/Tweet'
import { useOutletContext } from 'react-router-dom'

export default function Home() {
  const [tweet, settweet] = useState('')
  const [tweets, settweets] = useState([])
  const [User, setUser] = useOutletContext();
  const [imgFile, setimgFile] = useState('')

  useEffect(()=>{
    dbService.collection('tweets').onSnapshot((snapshot)=>{
      const tweetArr =snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }))
      settweets(tweetArr);
    })
  }, [])

  const onFileChange=(event)=>{
    const {
      target:{files},
    }=event;
    const thefile=files[0];
    const reader = new FileReader();
    reader.onloadend=(finishedEvent)=>{
     const src = finishedEvent.currentTarget.result;
     setimgFile(src)
    }
    reader.readAsDataURL(thefile)
  }
  
  const clearImg=()=>{
    setimgFile(null)
  }

  const submitTweet=async(e)=>{
    e.preventDefault();
    let imgFileSrc='';
    if(imgFile !==''){
      const fileRef=storageService.ref().child(`${User.uid}/${Date.now()}`);
    const response =await fileRef.putString(imgFile,'data_url');
    imgFileSrc=await response.ref.getDownloadURL();
  
    }
    await dbService.collection("tweets").add({
      creatorID:User.uid,
      creatorName:User.displayName,
      creatorPhoto:User.photoURL,
      text:tweet,
      imgFileSrc:imgFileSrc,
      createdAt:Date.now(),
    })  
    settweet('');
    setimgFile('');
  }
  
  return (
    <div>
      <form onSubmit={submitTweet}>
        <textarea onChange={(e)=>{settweet(e.target.value)}}
         value={tweet} 
         ></textarea>
         <input type='file' accept='image/*' onChange={onFileChange}></input>
         <button type='submit'>tweet</button>
         {imgFile && <div>
          <img src={imgFile}  width='50px' maxheight='50px' alt='uploadFile' />
          <button onClick={clearImg}>clear</button>
           </div>}
      </form>
      <div>
        {tweets.map((tweet)=>(
          <Tweet key={tweet.id} tweet={tweet} isOwner={tweet.creatorID===User.uid} />
        ))}
      </div>
    </div>
  )
}

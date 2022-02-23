/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom';
import { dbService } from '../fbase';
import { collection, getDocs, query, where } from "@firebase/firestore";
import { doc } from 'firebase/firestore';

export default function Profile() {
  const [User, setUser] = useOutletContext();
  const [userTweets, setuserTweets] = useState([]); 
  const [newDisplayName, setnewDisplayName] = useState('')
  let params = useParams();
  
  const getTweets = async () => {
    const q = query(
    collection(dbService, "tweets"),
    where("creatorID", "==", `${params.userId}`)
    );
    const querySnapshot = await getDocs(q);
    let getdata=[];
    querySnapshot.forEach((doc) => {getdata.push(doc.data())})
    setuserTweets(getdata); 
    };
  
  useEffect(()=>{
    getTweets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

const newName=(e)=>{
  setnewDisplayName(e.target.value)
}

  const onSubmit=async(e)=>{
    e.preventDefault();
    if(User.displayName !== newDisplayName){
      await User.updateProfile({
        displayName:newDisplayName
      })
      console.log(userTweets)
    }
  }
  return (
    <div>
      <h3>Hello! {' '}{User && User.displayName}</h3>
      <form onSubmit={onSubmit}>
        <input type='text' onChange={newName} value={newDisplayName}></input>
        <input type='submit' value='edit prodile'></input>
      </form>
     <ul>
     {userTweets && userTweets.map((tweet)=>(
        <li key={tweet.createdAt}>
          <p>{tweet.text}</p>
          {tweet.imgFileSrc &&
           <img className='tweetImg'
           src={tweet.imgFileSrc} alt={tweet.text} /> 
           }
        </li>
      ))}
     </ul>
    </div>
  )
}

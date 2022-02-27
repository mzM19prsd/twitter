import React, { useEffect, useState } from 'react'
import { dbService } from '../fbase'
import Tweet from '../componemts/Tweet'
import { useOutletContext } from 'react-router-dom'
import TweetForm from '../componemts/TweetForm'



export default function Home() { 
  const [tweets, settweets] = useState([])
  const [User, setUser] = useOutletContext();
  const [comments, setcomments] = useState([])
  
  useEffect(()=>{
    dbService.collection('tweets').orderBy("createdAt","desc").limit(10).onSnapshot((snapshot)=>{
      const tweetArr =snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }))
      settweets(tweetArr);
      console.log(`snap1`)
    })
    dbService.collection('comments').onSnapshot((snapshot)=>{
      const commentArr =snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }))
      setcomments(commentArr);
      console.log(`snap2`)
    })
  }, [])


  return (
    <div>
      <TweetForm User={User} />
      <div>
        {tweets.map((tweet)=>(
          <Tweet key={tweet.id} User={User} tweet={tweet} comments={comments} isOwner={tweet.creatorID===User.uid} />
        ))}
      </div>
    </div>
  )
}

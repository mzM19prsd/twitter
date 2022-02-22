import React, { useEffect, useState } from 'react'
import { dbService } from '../fbase'

export default function Home() {
  const [tweet, settweet] = useState('')
  const [tweets, settweets] = useState([])
console.log(tweets)

  useEffect(()=>{
    dbService.collection('tweets').onSnapshot((snapshot)=>{
      const tweetArr =snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }))
      settweets(tweetArr);
    })
    
  }, [])

  const submitTweet=async(e)=>{
    e.preventDefault();
    await dbService.collection("tweets").add({
      text:tweet,
      createdAt:Date.now(),
    })  }
  
  return (
    <div>
      <form onSubmit={submitTweet}>
        <textarea onChange={(e)=>{settweet(e.target.value)}}
         value={tweet} 
         ></textarea>
         <input type='file'></input>
         <button type='submit'>tweet</button>
      </form>
      <div>
        {tweets.map(tweet=>(
          <div key={tweet.id}>
            {tweet.text}
          </div>
        ))}
      </div>
    </div>
  )
}

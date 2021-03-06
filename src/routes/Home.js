import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import Tweet from "../componemts/Tweet";
import { useOutletContext } from "react-router-dom";
import TweetForm from "../componemts/TweetForm";

export default function Home() {
  const [tweets, settweets] = useState([]);
  const [User, setUser] = useOutletContext();

  useEffect(() => {
    dbService
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        const tweetArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        settweets(tweetArr);
      });
  }, []);

  return (
    <div>
      <TweetForm User={User} />
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            isOwner={tweet.creatorID === User.uid}
          />
        ))}
      </div>
    </div>
  );
}

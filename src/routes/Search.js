import React, { useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { dbService } from "../fbase";
import Tweet from "../componemts/Tweet";
export default function Search() {
  const [searchWord, setsearchWord] = useState("");
  const [searchedTweets, setsearchedTweets] = useState([]);
  const [searchedUsers, setsearchedUsers] = useState([]);

  const getTweets = async () => {
    const q = query(
      collection(dbService, "tweets"),
      where("text", ">=", `${searchWord}`)
    );
    const querySnapshot = await getDocs(q);
    let getdata = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setsearchedTweets(getdata);
  };

  const getUsers = async () => {
    const q = query(
      collection(dbService, "tweets"),
      where("creatorName", "==", `${searchWord}`)
    );
    const querySnapshot = await getDocs(q);
    let getdata = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setsearchedUsers(getdata);
  };

  function onSearch(e) {
    setsearchWord(e.target.value);
  }
  const submitSearch = (e) => {
    e.preventDefault();
    setsearchedTweets([]);
    setsearchedUsers([]);
    if (searchWord.length > 1) {
      getTweets();
      getUsers();
    } else {
      alert("Please enter at least 2 characters");
    }
  };

  return (
    <div>
      <form onSubmit={submitSearch}>
        <div id="searchBox">
          <i className="bx bx-search-alt-2"></i>
          <input
            id="searchInput"
            type="text"
            value={searchWord}
            onChange={onSearch}
            placeholder="Search tweets"
          ></input>
        </div>
      </form>
      
      {searchedTweets &&
        searchedTweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
      {searchedUsers &&
        searchedUsers.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
    </div>
  );
}

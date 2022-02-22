import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBWABysDShUrKDxRQIxzTIotpIg2bInp9I",
    authDomain: "twitter-c07f0.firebaseapp.com",
    projectId: "twitter-c07f0",
    storageBucket: "twitter-c07f0.appspot.com",
    messagingSenderId: "758895098172",
    appId: "1:758895098172:web:26e525823cacea0d338639"
  };

firebase.initializeApp(firebaseConfig);

export const firebaseInstance=firebase;
export const authService=firebase.auth();
export const dbService=firebase.firestore();
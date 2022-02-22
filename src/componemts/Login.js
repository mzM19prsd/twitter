import React from 'react'
import { authService, firebaseInstance } from '../fbase'

export default function login() {

  const goggleLogin = async(e)=>{
    let provider = new firebaseInstance.auth.GoogleAuthProvider();  
    const data=await authService.signInWithPopup(provider);
    console.log(data)
  }
  const githubLogin = async(e)=>{
    let provider = new firebaseInstance.auth.GithubAuthProvider();  
    const data=await authService.signInWithPopup(provider);
    console.log(data)
  }
  return (
      <div className='loginWrap'>
          <div className='login'>
            <button onClick={goggleLogin}>sign with goggle</button>
            <button onClick={githubLogin}>sign with github</button>
          </div>
      </div>
  )
}

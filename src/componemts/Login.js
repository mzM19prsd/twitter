import React from "react";
import { authService, firebaseInstance } from "../fbase";

export default function login() {
  const goggleLogin = async (e) => {
    let provider = new firebaseInstance.auth.GoogleAuthProvider();
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  const githubLogin = async (e) => {
    let provider = new firebaseInstance.auth.GithubAuthProvider();
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div className="loginWrap">
      <div className="login">
        <i className="bx bxl-twitter logo"></i>

        <div className="login-btn" onClick={goggleLogin}>
          <img
            src="https://cdn.icon-icons.com/icons2/2642/PNG/512/google_logo_g_logo_icon_159348.png"
            alt="google"
          />
          <span>Sign in with Google</span>
        </div>
        <div className="login-btn" onClick={githubLogin}>
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="github"
          />
          <span>Sign in with Github</span>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { authService } from "../fbase";

export default function Header() {
  const onLogout = () => {
    authService.signOut();
  };
  return (
    <div className="header">
      <div>
        <i className="bx bxl-twitter logo"></i>
      </div>
      <ul>
        <li>
          <Link to="/">
            <span>
              <i className="bx bxs-home"></i>
            </span>{" "}
            <span className="navItem-name">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <span>
              <i className="bx bxs-user"></i>
            </span>{" "}
            <span className="navItem-name">Profile</span>
          </Link>
        </li>
      </ul>
      <button onClick={onLogout}>Log out</button>
    </div>
  );
}

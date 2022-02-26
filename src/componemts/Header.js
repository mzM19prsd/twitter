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
          <Link to="/" className="navItem">
            <span>
            <i className='bx bx-home' ></i>
            </span>{" "}
            <span className="navItem-name">Home</span>
          </Link>
        </li>
        <li>
          <Link to='/profile' className="navItem">
            <span>
            <i className='bx bx-user' ></i>
            </span>{" "}
            <span className="navItem-name">Profile</span>
          </Link>
        </li>
        <li onClick={onLogout}>       
            <span onClick={onLogout} className="navItem">
            <span>
            <i className='bx bx-log-out'></i>
            </span>{" "}
            <span className="navItem-name">Log out</span>
            </span>         
        </li>
      </ul>
      
    </div>
  );
}

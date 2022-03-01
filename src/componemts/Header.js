import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../fbase";

export default function Header() {
  const [menuToggle, setmenuToggle] = useState(false);
  const onLogout = () => {
    authService.signOut();
  };
  function onMenuTog() {
    setmenuToggle(!menuToggle);
  }
  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/" onClick={onMenuTog}>
          <span>
            <i className="bx bxl-twitter logo"></i>
          </span>
        </Link>
        <span id="hd-menu" onClick={onMenuTog}>
          <i className="bx bx-menu"></i>
        </span>
      </div>
      <ul id={menuToggle ? "header-show" : "header-hide"}>
        <li>
          <Link to="/" className="navItem" onClick={onMenuTog}>
            <span>
              <i className="bx bx-home"></i>
            </span>{" "}
            <span className="navItem-name">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="navItem" onClick={onMenuTog}>
            <span>
              <i className="bx bx-user"></i>
            </span>{" "}
            <span className="navItem-name">Profile</span>
          </Link>
        </li>
        <li onClick={onLogout}>
          <span onClick={onLogout} className="navItem">
            <span>
              <i className="bx bx-log-out"></i>
            </span>{" "}
            <span className="navItem-name">Log out</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

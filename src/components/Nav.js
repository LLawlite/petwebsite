import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

import "../styles/Nav.css";
function Nav() {
  const user = useSelector(selectUser);
  return (
    <div className="nav">
      <div className="nav-contents">
        <Link to="/">
          <img
            className="nav-logo"
            src="https://logodix.com/logo/764972.png"
            alt="logo"
          />
        </Link>
        
        {!user ? (
          <Link to="/login">
            <button className="login-btn">LogIn</button>
          </Link>
        ) : (
          <Link to="/profile">
            <img
              className="nav-avatar"
              src="https://iconape.com/wp-content/files/ti/10842/png/iconfinder_12_avatar_2754577.png"
              alt="Avatar"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Nav;

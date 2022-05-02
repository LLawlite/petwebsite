import React, { useRef, useState } from "react";
import "../styles/LoginScreen.css";
import { signIn } from "../firebase";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../features/userSlice";
// import {auth} from "../firebase";

function LoginScreen() {
  const user = useSelector(selectUser);
  const [email, setEmail] = useState("");
  const emailRef = useRef(null);
  const passwodRef = useRef(null);
  const logIn = (e) => {
    e.preventDefault();
    signIn(emailRef.current.value, passwodRef.current.value);
  };
  if (user !== null) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Nav />
      <div className="loginUpScreen">
        <form>
          <h1>Sign In</h1>
          <input
            value={email}
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            required
            ref={passwodRef}
            type="password"
            placeholder="Password"
          />
          <button type="submit" onClick={logIn}>
            Sign In{" "}
          </button>
          <h4>
            <span className="signUp-gray">New to Netflix? </span>
            <Link to="/signup">
              <span className="signUpScreen-link"> Sign Up now.</span>
            </Link>
          </h4>
        </form>
      </div>
    </>
  );
}

export default LoginScreen;

import React, { useRef, useState } from "react";
import "../styles/LoginScreen.css";
import { signUp } from "../firebase";
import Nav from "./Nav";
import { auth } from "../firebase";
import  { Navigate} from 'react-router-dom'
import "../styles/SignUpScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { doc, setDoc } from "firebase/firestore"; 

function SignUpScreen() {
  const user = useSelector(selectUser);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userNameRef = useRef(null);




  const register =  (e) => {
    e.preventDefault();
    try {
      signUp(
        emailRef.current.value,
        passwordRef.current.value
      );

      auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          await setDoc(doc(db, "users", userAuth.uid), {
            username: userNameRef.current.value,
            email:userAuth.email ,
            favourite:[""]
           
          });
        } else {
          console.log("noone here");
        }
        
      });
    } catch (err) {
      alert(err);
    }
   
  };

  if(user!==null)
  {
    return <Navigate to="/"/>
  }

  return (
    <>
      <Nav />
      <div className="signUpScreen">
        <form>
          <h1>Sign Up</h1>
          <input
            value={userName}
            ref={userNameRef}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <input
            value={email}
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            required
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
          <button type="submit" onClick={register}>
            Sign Up{" "}
          </button>
        
        </form>
      </div>
    </>
  );
}

export default SignUpScreen;

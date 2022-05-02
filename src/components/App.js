import React, { useEffect, useState } from "react";
import '../styles/App.css';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import PetScreen from "./PetScreen";
import Home from "./Home";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import {auth} from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../features/userSlice";
import Profile from "./Profile";
import Favourites from "./Favourites";

function App() {

 const dispatch=useDispatch();
 const user=useSelector(selectUser);
  useEffect(()=>{
   const unsubscribe= auth.onAuthStateChanged((userAuth)=>{
    
    if(userAuth)
      {
         
        
        dispatch(
          login({
            uid:userAuth.uid,
            email:userAuth.email,
          })
        )
       
      }
      else
      {
       
        dispatch(logout());
      }
    })
    return unsubscribe;
  },[dispatch])


  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home category=""   />} />
        <Route path="/petscreen" element={<PetScreen/>} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
    

    
    </div>
  );
}

export default App;

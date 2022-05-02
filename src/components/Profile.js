
import React from 'react';
import {signout} from "../firebase";
import {selectUser} from "../features/userSlice";
import Nav from './Nav';
import "../styles/Profile.css";
import {auth} from "../firebase"
import { useSelector ,useDispatch} from "react-redux";
import { Navigate } from "react-router-dom";
import {Link} from "react-router-dom";
import {logout} from "../features/userSlice";



function ProfileScreen() {
  const dispatch=useDispatch();
    const user=useSelector(selectUser);
    function signOut()
    {
      auth.signOut();
     
      
     
    
    }
   if(user===null)
   {
    return <Navigate to="/"/>;
   }
  return (
    <div className='profileScreen'>
    <Nav/>
    <div className='profileScreen-body'>
        <h1>Edit Profile</h1>
        <div className='profileScreen-info'>
            <img
                src='https://iconape.com/wp-content/files/ti/10842/png/iconfinder_12_avatar_2754577.png'
                alt='profile'
            />
            <div className='profileScreen-details'>
                <h2>{user.email}</h2>
                <div className='profileScreen-plans'>
                <h3>Plans</h3>
               
                    <button
                    onClick={signOut}
                    className="profileScreen-signOut"
                    >Sign Out</button>
                    
                </div>
            </div>
        </div>
    </div>
        
    </div>
  )
}

export default ProfileScreen
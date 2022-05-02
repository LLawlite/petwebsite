import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PetCard.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@mui/icons-material/Favorite";
import db from "../firebase";
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
import {auth} from "../firebase"
function PetCard(props) {
  const [favourite,setFavourite]=useState([]);
  const [uid,setuid]=useState(null);
  const user = useSelector(selectUser);
  const [like, setLike] = useState(false);
 
  function arrayRemove(array, value) {
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1); // 2nd parameter means remove one item only
    }
    return array;
  }
   const isFavourite=async ()=>{
    const userdocRef = doc(db, "users", uid);
    const userdocSnap = await getDoc(userdocRef);
    setFavourite(userdocSnap.data().favourite);
  }
  // isFavourite();
  
  useEffect(()=>{
    const unsubscribe= auth.onAuthStateChanged((userAuth)=>{
     
     if(userAuth)
       {  
        setuid(userAuth.uid);
        
       }
       else
       {
         console.log("noone here")
       }
     })
     if(uid)
     {
       console.log("hello i am uid");
       isFavourite();
       if(favourite.includes(props.uid))
       {
         setLike(true);
       }
     }
    return unsubscribe;
    
   },[])


 

  async function liked() {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    let favourite = docSnap.data().favourite;

    if (!like) {
      setLike(true);
      favourite.push(props.uid);
      await setDoc(docRef, {
        email: docSnap.data().email,
        username: docSnap.data().username,

        favourite: favourite,
      });
    } else {
      setLike(false);
      let result = arrayRemove(favourite, props.uid);
      console.log(result);
      await setDoc(docRef, {

        email:docSnap.data().email,
        username:docSnap.data().username,

        favourite:result

       });
    }
  }

 console.log("I am petcard");
  return (
    <div className="petcard">
      <Link className="link" to={!user ? "/login" : "/petscreen"} state={props}>
        <img src={props.img} alt="petimage"></img>
        <h1>{props.name}</h1>
      </Link>
      <div>
        <p>category: {props.category}</p>
        <p>Age: {props.age}</p>
       { 
         props.heart?
       (   like ? (
          <FavoriteIcon style={{ color: "red" }} onClick={() => liked()} />
        ) : (
          <FavoriteBorderIcon onClick={() => liked()} />
        )):null
        }
      </div>
    </div>
  );
}
export default PetCard;

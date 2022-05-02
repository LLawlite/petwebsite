import React, { useEffect, useState } from 'react'
import "../styles/Favourites.css";
import Nav from './Nav';
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import PetCard from './PetCard';
import {auth} from "../firebase";
function Favourites() {
    const user = useSelector(selectUser);
   
    const [favouritePets,setFavouritePets]=useState([]);
    const [userFavourite,setUserFavourite]=useState([]);
    const [uid,setuid]=useState(null);
    // async function getPetData(favourites)
    // {
    //     favourites.map((favouriteId)=>{
    //         const petdocRef = doc(db, "pets", favouriteId);
    //         const petdocSnap = await getDoc(petdocRef);
    //         console.log(petdocRef.data());
    //     })
    // }
    const getPetData=async ()=>{

      
        userFavourite.map(async  (favourite)=>{
            const docRef = doc(db, "pets", favourite.trim());
            const docSnap = await getDoc(docRef);
            setFavouritePets((previous)=>[...previous,docSnap.data()])
        })
    }
    const favourite=async ()=>{
     
        const userdocRef = doc(db, "users", uid);
        const userdocSnap = await getDoc(userdocRef);
        setUserFavourite(userdocSnap.data().favourite);
        console.log(userFavourite);


    }

    
    useEffect(()=>{
      const unsubscribe= auth.onAuthStateChanged((userAuth)=>{
       setUserFavourite([]);
       setFavouritePets([]);
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
         console.log("hello i am Favorite page");
        favourite();
        getPetData();
       }
      return unsubscribe;
      
     },[])
 

   
  return (
      <>
      <Nav />
    <div className='favourites'>
        <div className="cards">
          {favouritePets.map((pet) => (
            <PetCard
              key={pet.uid}
              uid={pet.uid}
              img={pet.img}
              name={pet.name}
              age={pet.age}
              email={pet.email}
              category={pet.category}
              type={pet.type}
              weight={pet.weight}
              height={pet.height}
              cost={pet.cost}
              reviews={pet.reviews}
              heart={false}
            />
          ))}
        </div>
    </div>
    </>
  )
}

export default Favourites
import React from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import "../styles/Home.css";
import db from "../firebase";
import Nav from "./Nav";

import PetCard from "./PetCard";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Home(props) {
  const [pets, setPets] = useState([]);
  async function findItemFromDatabase(category) {
    setPets([]);

    const q = query(collection(db, "pets"), where("category", "==", category));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setPets((previous) => [...previous, doc.data()]);
    });
  }
  useEffect(() => {
    setPets([]);
    const fetchdata = async () => {
      const querySnapshot = await getDocs(collection(db, "pets"));

      querySnapshot.forEach((doc) => {
        setPets((previous) => [...previous, doc.data()]);
      });
    };
    fetchdata();
  }, []);


  
  return (
    <>
      <Nav />
      <div className="secondry-nav">
        <div class="dropdown">
          <span>Filter</span>
          <div class="dropdown-content">
            <p
              onClick={() => {
                findItemFromDatabase("dog");
              }}
            >
              Dog
            </p>
            <p
              onClick={() => {
                findItemFromDatabase("cat");
              }}
            >
              Cat
            </p>
          </div>
        </div>
        <Link to="favourites">
        <button className="favourite-btn">Favourites</button>
        </Link>
      </div>
      <Banner />
      <div className="home">
        <div className="cards">
          {pets.map((pet) => (
            <PetCard
            userId={props.userId}
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
              heart={true}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

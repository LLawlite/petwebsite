import React from "react";
import "../styles/PetScreen.css";
import Nav from "./Nav";
import { useLocation } from 'react-router-dom';


function PetScreen() {
  const location = useLocation();
  const props=location.state;
  console.log(props);
  return (
    <>
    <Nav/>
    <div className="backspace"></div>
      <div className="petscreen">
          <div className="petscreen-contents">
            <div className="info-block">
              <img src={props.img}/>
              <div className="pet-details">
                <h1>Cost:{props.cost}RS</h1>
                <h3>Name: {props.name}</h3>
                <h3>Age: {props.age}</h3>
                <h3>Email: {props.email}</h3>
                <h3>Category: {props.category}</h3>
                <h3>Type: {props.type}</h3>
                <h3>Weight: {props.weight}kg</h3>
                <h3>height: {props.height}cm</h3>
                <h3>Description: {props.description}</h3>

                <button>Buy Now</button>

              </div>
              <div>
              <h1>Reviev section</h1>
            </div>
            </div>
           

          </div>
      </div>
    </>
  )
}

export default PetScreen
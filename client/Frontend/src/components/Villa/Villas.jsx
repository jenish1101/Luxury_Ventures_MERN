// import { villas } from '../../villas';

//Api_Villas
import { Villas_Api } from '../ApiVillas/Villas_Api';

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// React Icons 
// import { IoIosPeople } from "react-icons/io";
// import { FaBed } from "react-icons/fa";
// import { BiArea } from "react-icons/bi";
// import { FaBath } from "react-icons/fa6";
// import { Link } from 'react-router-dom';
// import { CiLocationOn } from "react-icons/ci";
// import { FaMountainSun } from "react-icons/fa6";
// import { TbBeach } from "react-icons/tb";


const Villas = () => {

  const navigate = useNavigate();

  // it's neccessary for authentication using jwt token
  useEffect(() => {
    const token = sessionStorage.getItem('AccessToken');
    if (!token) {
      alert("Login To Proceed...");
      navigate("/login");
      return;
    }
    axios.get("http://localhost:3000/villas", {
      headers: { Authorization: `Bearer ${token}` }     //Pass Jwt Token With Api In Header 
    })
    .then(response => {
      // Here If response.data.message is Not Equal To Home Page User Will Redirect To Login Page 
      if (response.data.message !== "Villas Page...") {
        navigate("/login");
      }
    })

    // Here Any Error User Will Redirect To Login Page
    .catch(err => {
      console.log(err);
      navigate("/login");
    });
    
  }, [navigate]);

  return (
    <>
      {/* <div className="page" id='allVillas'>
        <h1>ALL VILLAS</h1>
        <p>{villas.length} Properties</p>
        <div className="villasContainer">
          {villas.map((element) => {
            return (
              <Link to={`/villa/${element.id}`} className="card" key={element.id}>
                <img src={element.image} alt={element.name} />
                <div className="location_text">
                  <span>
                    <CiLocationOn />
                    {element.location}
                  </span>
                  <span>
                    {element.category === "Mountains" ? <FaMountainSun/> : <TbBeach/>}
                  </span>
                  <span>{element.category}</span>
                </div>
                <div className="title_text">{element.name}</div>
                <div className="specifications">
                  <div className="spec">
                    <IoIosPeople />
                    <span>{element.guests}</span>
                    Guests
                  </div>
                  <div className="spec">
                    <FaBed />
                    <span>{element.bedrooms}</span>
                    Bedrooms
                  </div>
                  <div className="spec">
                    <BiArea />
                    <span>{element.squareMeter}</span>
                    Area
                  </div>
                  <div className="spec">
                    <FaBath />
                    <span>{element.bathrooms}</span>
                    Bathrooms
                  </div>
                </div>
                <div className="badge">
                  From <span>${element.dailyRent} / Day </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div> */}


      <Villas_Api/>
    </>
  )
}

export default Villas

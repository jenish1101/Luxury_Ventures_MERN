import HeroSection from "../../SubComponents/HeroSection";
import TopVillas from "../../SubComponents/TopVillas";
import Regions from "../../SubComponents/Regions";
import OurSpecialities from "../../SubComponents/OurSpecialities";
import Host from "../../SubComponents/Host";
import About from "../../SubComponents/About";
import Contact from "../../SubComponents/Contact";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {

  const navigate = useNavigate();

    // it's neccessary for authentication using jwt token

    useEffect(() => {
      const token = sessionStorage.getItem('AccessToken');
      if (!token) {
        // navigate("/login");
        navigate("/visitorhome")
        setTimeout(() => {
          alert("Please Login To Proceed...")
        }, 1000);
        return;
      }
      axios.get("http://localhost:3000/", {
        headers: { Authorization: `Bearer ${token}` }     //Pass Jwt Token With Api In Header 
      })
      .then(response => {
        // Here If response.data.message is Not Equal To Home Page User Will Redirect To Login Page 
        if (response.data.message !== "Home Page...") {
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
      <article className="page">
        <HeroSection/>
        <TopVillas/>
        <Regions/>
        <OurSpecialities/>
        <Host/>
        <About/>
        <Contact/>
      </article>
    </>
  );
};

export default Home;

import AboutComponentMini from "../../SubComponents/About";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AboutUs = () => {

    const navigate = useNavigate();

    // it's neccessary for authentication using jwt token

    useEffect(() => {
      // const token = sessionStorage.getItem('AccessToken');
      // if (!token) {
      //   alert("Login To Proceed...");
      //   navigate("/login");
      //   return;
      // }
      axios.get("http://localhost:3000/about", {
        // headers: { Authorization: `Bearer ${token}` }     //Pass Jwt Token With Api In Header 
      })
      .then(response => {
        // Here If response.data.message is Not Equal To Home Page User Will Redirect To Login Page 
        if (response.data.message !== "About Page...") {
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
    <section id="aboutPage" className="page">
      <div className="container">
        <img src="/about.jpg" alt="about" />
        <div className="content">
          <h3>Your peace of mind, our priority!</h3>
          <p>At our agency, your peace of mind is our top priority. We are committed to providing a seamless and stress-free experience from start to finish. Our team of dedicated professionals ensures that every step of your property journey is handled with the utmost care and attention.</p>


          <p> Whether you’re buying, selling, or renting, we prioritize clear communication, expert advice, and personalized service to meet your unique needs.</p>

          <p>Trust us to guide you through the process with confidence and ease, so you can focus on enjoying your new home or investment. Your satisfaction and comfort are our ultimate goals.</p>

        </div>
      </div>
      <AboutComponentMini />
    </section>
  );

};

export default AboutUs;

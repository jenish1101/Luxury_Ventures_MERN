import "./AboutUs.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {

  const navigate = useNavigate();

  useEffect(() => {

      const token = sessionStorage.getItem("AdminAccessToken");
      if (!token) {
          navigate("/");
          alert("Please Login To Proceed...")
          return;
        }
  }, [navigate]);

    return (
        <>
          <section id="aboutUs_Mini">
            <div className="first_container">
              <div className="content">
              <h1>ABOUT US</h1>
              
              <p>
              Welcome to our luxury ventures website, your premier destination for finding exceptional properties and expert guidance.
              </p>

              <p> We specialize in connecting buyers and sellers with the finest homes, villas, and commercial spaces in prime locations.</p>
              
              <p>Our dedicated team of experienced professionals is committed to providing personalized service, ensuring that your real estate journey is seamless and enjoyable. </p> 

              <p>Whether you are looking to buy, sell, or rent, we offer comprehensive solutions tailored to your unique needs. </p>
    
              <p>Explore our extensive listings and discover your dream property with us. Trust in our expertise to make your real estate dreams a reality.</p>
    
              </div>
              <button>We strive to offer you best possible homes to stay!</button>
            </div>
            <div className="second_container">
              <div className="image_1">
                <img src="/people.jpg" alt="people" />
              </div>
              <div className="image_2">
                <img src="people2.jpg" alt="people2" />
              </div>
            </div>
          </section>
        </>
      );
}

export default AboutUs
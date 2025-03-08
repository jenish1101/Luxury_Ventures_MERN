import "./Home.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
  
    const token = sessionStorage.getItem('AdminAccessToken');
    // here if jwt token not avaliable than user should be navigate to login page 
      if (!token) {
        navigate("/adminlogin");
        setTimeout(() => {
          alert("Please Login To Proceed...")
        }, 1000);
        return;
      }

  }, [])
  

  return (
    <div className="home-container">
      <div className="banner">
        <img src="./AdminBanner.jpg" alt="Admin Banner" />
        <div className="banner-text">
          <h1>Welcome, Admin</h1>
          <p>Manage your site efficiently with our powerful tools.</p>
        </div>
      </div>

      <div className="admin-options">
        <div className="option-card">
          <h2>Manage Bookings</h2>
          <p>View, edit, or cancel client bookings with easy.</p>
        </div>
        <div className="option-card">
          <h2>User Queries</h2>
          <p>Respond to client inquiries and ensure satisfaction.</p>
        </div>
        <div className="option-card">
          <h2>Site Analytics</h2>
          <p>Monitor site performance and user interactions.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

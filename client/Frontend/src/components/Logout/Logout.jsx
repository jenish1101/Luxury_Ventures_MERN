import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {

        const token = sessionStorage.getItem("AccessToken");
    
        // If AccessTokn Is Not Avaliable 
        if (!token) {
        //   alert("Login To Proceed...");
          navigate("/login"); // Redirect to home or another page if no token is present
          return; // Stop further execution
        }
        
        // If AccessTokn Is Avaliable 
        const logout = async () => {
          try {
              const token = sessionStorage.getItem("AccessToken");
      
              await axios.post("http://localhost:3000/logout", {}, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  },
                  withCredentials: true
              });
      
              sessionStorage.removeItem('AccessToken');
              navigate("/login");
              setTimeout(() => {
                  alert("Logout successfully...");
              }, 1000);
          } catch (error) {
              console.error("Logout failed", error);
          }
      };
      
    
        logout();
      }, [navigate]);


    return (
        <>
            <h1>Logout Page</h1>
        </>
    )
}

export default Logout

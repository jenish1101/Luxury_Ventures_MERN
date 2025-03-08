import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from "../../Context/AutnContext";

const Navbar = () => {
  const [navHeight, setNavHeight] = useState(false);
  const navigate = useNavigate();


  // For Toggle Navbar 
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
    setTimeout(() => {
      alert("Logout Successfully...");
    }, 1000);
  };

  return (
    <>
      <nav className={navHeight ? "show nav" : "nav"}>
        <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>LUXURY VENTURES</div>
        
        <ul>
          {isAuthenticated ? (
            <>
              <li>
                <Link to={'/aboutus'}>ABOUT US</Link>
              </li>
              <li>
                <Link to={'/villas'}>VILLAS</Link>
              </li>
              <li>
                <Link to={'/your-booking'}>BOOKINGS</Link>
              </li>
              <li>
                <Link to={"/answer"}>ANSWER</Link>
              </li>
              <li>
                <Link to={'/logout'} onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
          <>
            <li>
              <Link to={'/visitorhome'}>FOR VISITORS</Link>
            </li>
            <li>
              <Link to={"/visitorfaq"}>FAQ</Link>
            </li>
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
          </>
          )}
        </ul>

        <RxHamburgerMenu
          className="hamburger"
          onClick={() => setNavHeight(!navHeight)}
        />
      </nav>
    </>
  );
};

export default Navbar;


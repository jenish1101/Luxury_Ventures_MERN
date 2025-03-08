// src/components/Navbar/Navbar.js
import "./Navbar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
  const [navHeight, setNavHeight] = useState(false);
  const navigate = useNavigate();
  
  // For Toggle Navbar 
  const { isAuthenticated, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate("/adminlogin");
    setTimeout(() => {
      alert("Logout Successfully...");
    }, 1000);
  };

  return (
    <nav id="admin-navbar" className={navHeight ? "show nav" : "nav"}>
      <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        LUXURY VENTURES
      </div>
      <ul> 
      {/* For Toggle Navbar  */}
        {isAuthenticated ? (
          <>
            <li>
              <Link to={"/userbooking"}>BOOKING</Link>
            </li>
            <li>
              <Link to={"/userquery"}>QUERY</Link>
            </li>
            <li>
              <Link to={"/showvillas"}>VILLAS</Link>
            </li>
            
            <li>
              <Link to={"/adminabout"}>ABOUT</Link>
            </li>
            <li>
              <Link to={"/adminterms"}>TERMS&CONDITION</Link>
            </li>
            
            <li>
              <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                LOGOUT
              </span>
            </li>
          </>
        ) : ( 
          <li>
            <Link to={"/adminlogin"}>LOGIN</Link>
          </li>
        )} 
      </ul>
      <RxHamburgerMenu className="hamburger" onClick={() => setNavHeight(!navHeight)} />
    </nav>
  );
};

export default Navbar;





// import  { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { RxHamburgerMenu } from "react-icons/rx";
// import "./Navbar.css"


// const Navbar = () => {
//   const [navHeight, setNavHeight] = useState(false);
//   const navigate = useNavigate();


//   return (
//     <>
//       <nav id="admin-navbar" className={navHeight ? "show nav" : "nav"}> 
//         <div className="logo" onClick={()=> navigate("/")} style={{cursor:"pointer"}}>LUXURY VENTURES</div>
//         <ul>
//           <li>
//             <Link to={"/userbooking"}>BOOKING</Link>
//           </li>
//           <li>
//             <Link to={"/userquery"}>QUERY</Link>
//           </li>
//           <li>
//             <Link to={"/adminlogin"}>
//               LOGIN
//             </Link>
//           </li>
//           {/* <li>
//               <Link to={"/logout"}>Logout</Link>
//           </li> */}
//         </ul>
//         <RxHamburgerMenu
//           className="hamburger"
//           onClick={() => setNavHeight(!navHeight)}
//         />
//       </nav>
//     </>
//   );
// };

// export default Navbar;



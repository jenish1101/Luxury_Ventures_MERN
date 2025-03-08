import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <>
      <footer className={isHomePage ? 'homePage_footer otherPage_footer': "otherPage_footer"} style={{background:"#606060" , color:"white"}}>
        <div className="container">
          <h4 style={{borderBottom:"2px solid white"}}>LUXURY VENTURES</h4>
          <p>
          Discover our luxury ventures, featuring upscale amenities and elegant designs, providing a sophisticated living experience that combines comfort, style, and exclusivity.
          </p>
          <ul>
            {/* <li>
              <Link to={"/"}>Home</Link>
            </li> */}
            <li>
              <Link to={"/aboutus"}>About</Link>
            </li>
            <li>
              <Link to={"/termsandconditions"}>Terms&Conditions</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="container" style={{display:"flex",justifyContent:"end",alignItems:"center"}}>
          <p >© All Rights Reserved By JENISH.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

import "./Login.css"
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AutnContext";

const Login = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  // For Toggle Navbar 
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email, password
      })
      console.log(res);
      alert(res.data.message);

      if (res.data.message === "Login Successfully...") {
        // sessionStorage.setItem("AccessToken" , res.data.AccessToken);
        // For Toggle Navbar set jwt token value in login
        login(res.data.AccessToken);
        navigate("/");
        // alert("Login Successfully...");
      }
    }
    catch (error) {
      console.error("Login Error", error);
    }
  }

  return (
    <>
      <section id="login">

        <h1>LOGIN</h1>
        <p>Please enter your email and password to access your account.
          If you don&#39;t have an account yet, you can
          <span> <Link to="/signup">sign up here.</Link> </span>
        </p>

        <div className="container">
          <img src="/login.jpg" alt="about" />

          <div className="content">
            {/* <h3>Let's connect</h3> */}
            <h3>Let&#39;s connect</h3>

            <form onSubmit={handleSubmit}>
              <div className="form_data">
                <input type="email" placeholder="Email"
                  onChange={e => setemail(e.target.value)}
                />
                <input type="password" placeholder="Password"
                  onChange={e => setpassword(e.target.value)}
                />
                <div>
                  <button type="submit">LOGIN</button>
                </div>
              </div>
            </form>

          </div>

        </div>

      </section>

    </>
  );
}

export default Login
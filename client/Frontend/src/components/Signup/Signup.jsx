import "./Signup.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  
  const navigate = useNavigate();

  // For Validation 
  const [error, setError] = useState()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // For Validation Remove Errors
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/signup", formData);
      // console.log(res);
      if (res.data.message === "Signup Successfully...") {
        navigate("/login");
        alert("Signup Successfully...");
      }

      if(res.data.message === "User Already Exists..."){
        alert("User Already Exists...");
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // console.log("Error response..." , error.response);
        // alert(error.response.data.errors[0].msg); // Display only the first validation error message
        setError(error.response.data.errors[0].msg);
      } else {
        console.error("Signup Error...", error);
        alert("Signup failed. Please try again later.");
      }
    }
  };

  return (
    <>
      <section id="signup">

        <h1>SIGNUP</h1>
        <p>
          Please enter your username, email, and password to Signup. If you already have an account, you can
          <span> <Link to="/login">Login here.</Link> </span>
        </p>

        <div className="container">
          <img src="/login.jpg" alt="about" />

          <div className="content">
            <h3>Let&#39;s connect</h3>

            <form onSubmit={handleSubmit}>
              
              <div className="form_data">

                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                />
                {error === "Name is required" ? error : "" }

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                />
                {error === "Invalid email format" ? error : "" }
                
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  onChange={handleChange}
                />
                {error === "Password must be at least 6 characters long" ? error : "" }

                <input
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
                {error === "Passwords do not match" ? error : "" }

                <div>
                  <button type="submit">SIGNUP</button>
                </div>

              </div>
            </form>

          </div>
        </div>

      </section>
    </>
  );
};

export default Signup;















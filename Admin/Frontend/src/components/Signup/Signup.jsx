import "./Signup.css";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
//   const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // alert(username);
    const res = await axios.post("http://localhost:3001/adminsignup",{username,password,email});
    console.log(res);
    
    if(res.data.message === "Admin Signup Successfully..."){
        alert("Admin Signup Successfully...");
    }

    if(res.data.message === "User Already Exists..."){
      alert("User Already Exists...");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Signup</h2>
      <div className="adminimage">
        <img src="./AdminLogo.png" alt="Admin" />
      </div>
      <form onSubmit={handleLogin} className="admin-form">
      <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            required
            style={{fontSize:"20px"}}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
          className="signup"
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
           className="signup"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
    
        <button type="submit" style={{marginTop:"20px" , marginBottom:"20px", width:"100%"}}>Signup</button> <br />

        <span> <Link to="/adminlogin">Login here.</Link> </span>
      </form>
    </div>
  );
};

export default AdminLogin;

import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // For Toggle Navbar 
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    // alert(username)
    const res = await axios.post("http://localhost:3001/adminlogin", { username: username, password });

    if (res.data.message === "Username OR Password Invalid") {
      alert("Username OR Password Invalid");
    }

    if (res.data.message === "Admin Login Successfully...") {
      // navigate("/userbooking");
      // sessionStorage.setItem("AdminAccessToken" , res.data.AdminAccessToken);

      // For Toggle Navbar set jwt token value in login
      login(res.data.AdminAccessToken);
      navigate("/");
      alert("Admin Login Successfully...");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
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
            placeholder="Enter your Name"
            required
            style={{ fontSize: "20px" }}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}>Login</button>

        <span>
          <Link to="/adminsignup">Signup here.</Link>
        </span>

      </form>
    </div>
  );
};

export default AdminLogin;

const express = require("express");
const router = express.Router();
const signupmodel = require("../models/signup_model");
const bcrypt = require("bcrypt"); 

const jwt = require("jsonwebtoken"); //For Authentication

router.route("/")
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
    
      // Check if the user already exists
      const userexist = await signupmodel.findOne({ email });
      if (!userexist) {
        return res.json({ message: "User Not Exists..." });
      }
    
      // Validate hashed password
      const validpassword = await bcrypt.compare(password, userexist.password);
      if (!validpassword) {
        return res.json({ message: "Password is incorrect" });
      }
    
      // Send Jwt Token To Frontend 
      const AccessToken = jwt.sign({ id: userexist._id, email: userexist.email }, "JwtTokenSecretKey");

      console.log(AccessToken);

      return res.json({ message: "Login Successfully..." , AccessToken});
    } 
    catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ message: "Server error during login. Please try again later." });
    }
  });

module.exports = router;

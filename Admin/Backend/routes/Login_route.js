const express = require("express");
const router = express.Router();

const AdminSignupModal = require("../Models/signup_models");

const jwt = require("jsonwebtoken"); //For Authentication

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  // console.log(username,password);

  const adminUsername = await AdminSignupModal.findOne({ username });

  const adminPassword = await AdminSignupModal.findOne({ password });

  if (!adminUsername || !adminPassword) {
    // console.log("Username OR Password Invalid");
    return res.json({ message: "Username OR Password Invalid" });
  }

  // Send Jwt Token To Frontend
  const AdminAccessToken = jwt.sign({ id: adminUsername._id }, "JwtTokenSecretKey");
  // console.log(AdminAccessToken);

  return res.json({ message: "Admin Login Successfully..." , AdminAccessToken});
});

module.exports = router;

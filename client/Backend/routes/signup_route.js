const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const signupmodel = require("../models/signup_model");

// For Validation Using Express-Validator
const { body, validationResult } = require("express-validator");

// Define route using router.route
router.post(
  "/",
  // Validate the input fields
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirmpassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match"),
  ],

  // Process the signup request
  async (req, res) => {
    const { name, email, password } = req.body;

    // Extract validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the user already exists
      const userexist = await signupmodel.findOne({ email });
      if (userexist) {
        return res.json({ message: "User Already Exists..." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user with the hashed password
      const SignupData = await signupmodel.create({
        name,
        email,
        password: hashedPassword, // Save the hashed password
        confirmpassword: hashedPassword, // Save the hashed password for confirmation
      });

      return res.json({ message: "Signup Successfully...", SignupData });
    } 
    catch (error) {
      console.error("Signup Error:", error);
      return res.status(500).json({
        message: "Server error during signup. Please try again later.",
      });
    }
  }
);

module.exports = router;


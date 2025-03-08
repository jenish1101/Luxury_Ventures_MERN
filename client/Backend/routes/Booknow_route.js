const express = require("express");
const router = express.Router();
const BookNowModel = require("../models/Booknow_models");
const verifyAccessToken = require("../middleware/auth");

router.post("/", verifyAccessToken , async (req, res) => {

  try {
    const {
      villaName,
      name,
      surname,
      mobile,
      email,
      country,
      city,
      date,
      numberOfSeats,
      numberOfDays,
    } = req.body;
    
    // console.log("Book Name : " ,villaName,name,surname,mobile,email,country,city,date,numberOfSeats,numberOfDays);

    // if User Book Same Villa On Same Date
    const existingBooking = await BookNowModel.findOne({
      email,
      villaName,
      date,
    });

    if (existingBooking) {
      // console.log("Book already exists");
      return res.json({ message: "You have already booked this villa on the selected date." });
    }
    

    // For Unique Booking 
    const BookNowData = await BookNowModel.create({
      villaName,
      name,
      surname,
      mobile,
      email,
      country,
      city,
      date,
      numberOfSeats,
      numberOfDays,
    });

    res.json({ message: "Booking SuccessFully...", BookNowData });
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error during booking. Please try again later." });
  }
});

module.exports = router;

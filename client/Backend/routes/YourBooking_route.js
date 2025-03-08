const express = require("express");
const router = express.Router();
const BookingModel = require("../models/Booknow_models");
const verifyAccessToken = require("../middleware/auth");

// Fetch user-specific bookings
router.get("/", verifyAccessToken, async (req, res) => {
    try {
      
        // Get user's email from JWT token
        const userEmail = req.user.email; // Get user's email from JWT token
        console.log(userEmail);
        
        const BookingModelData = await BookingModel.find({ email: userEmail }); // Fetch bookings for the user
        
        if (!BookingModelData.length) {
            return res.status(404).json({ message: "No bookings found for this user." });
        }

        return res.json({ message: "Your Booking...", BookingModelData });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

router.delete("/cancle-client/:id",async(req,res)=>{

    const {id} = req.params;
    // console.log("DELETE: " , id);

    const DeleteBooking = await BookingModel.findByIdAndDelete(id);

    if(!DeleteBooking){
        return res.json({message:"Booking Not Cancle..."})
    }

    return res.json({message:"Cancle..."});
})

module.exports = router;





const express = require("express");
const router = express.Router();

// Import BookNow Model From Client Side Folder To Backend Folder
const BookNowModel = require("../../../client/Backend/models/Booknow_models");

// For Verify Admin Have AcessToken Or Not 
const AdminVerifyAccessToken = require("../Middleware/auth")

router.get("/", AdminVerifyAccessToken ,async(req,res)=>{

    const ClientBooking = await BookNowModel.find({});
    // console.log(ClientBooking);
    
    return res.json({message:"User Booking Details Show Successfully..." , ClientBooking});
})

router.delete("/canclebooking/:id",async(req,res)=>{

    const { id } = req.params;
    console.log(id);
    
    const DeleteBooking = await BookNowModel.findByIdAndDelete(id);
    // console.log("Booking Cancle : " , DeleteBooking);
    
    if(!DeleteBooking){
        return res.json({message:"Booking Not Cancle..."});
    }
    
    return res.json({message:"Booking Cancle Successfully..."});
})

module.exports = router;
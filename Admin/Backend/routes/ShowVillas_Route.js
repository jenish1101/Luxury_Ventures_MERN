const express = require("express");
const router = express.Router();

const AddVillasModal = require("../Models/Villas_Modles");


// For Verify Admin Have AcessToken Or Not 
const AdminVerifyAccessToken = require("../Middleware/auth")

router.get("/", AdminVerifyAccessToken ,async(req,res)=>{

    const AddedVillas = await AddVillasModal.find({});
    // console.log("AddedVillas: " , AddedVillas);
    

    return res.json({message:"ShowVillas Route...", AddedVillas})
})

module.exports = router;
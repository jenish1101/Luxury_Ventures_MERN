const express = require("express");
const router = express.Router();

// const verifyAccessToken = require("../middleware/auth");

router.post("/",async(req,res)=>{
    res.json({message:"Logout SuccessFully..."});
})

module.exports = router;
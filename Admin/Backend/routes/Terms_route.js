const express = require("express");
const router = express.Router();

// For Verify Admin Have AcessToken Or Not 
const AdminVerifyAccessToken = require("../Middleware/auth");

router.get("/", AdminVerifyAccessToken, async(req,res)=>{
    return res.json({message:"Terms&Condition Router..."});
})

module.exports = router;
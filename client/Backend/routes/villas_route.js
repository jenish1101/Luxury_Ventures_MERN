const express = require("express");
const router = express.Router();

const verifyAccessToken = require("../middleware/auth");

router.get("/",async(req,res)=>{
    res.json({ message: "Villas Page..." });
})

module.exports = router;
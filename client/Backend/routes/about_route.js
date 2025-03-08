const express = require("express");
const router = express.Router();

// const verifyAccessToken = require("../middleware/auth");
// router.get("/",verifyAccessToken,async(req,res)=>{
//     res.json({ message: "About Page..." });
// })

router.get("/",async(req,res)=>{
    res.json({ message: "About Page..." });
})



module.exports = router;
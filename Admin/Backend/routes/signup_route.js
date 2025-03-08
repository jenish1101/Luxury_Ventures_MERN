const express = require("express");
const router = express.Router();

const AdminSignupModal = require("../Models/signup_models");

router.post("/",async(req,res)=>{

    const {username,password,email} = req.body;
    // console.log(email);
    
    
    try {
        
        const userexist = await AdminSignupModal.findOne({ username });
        if (userexist) {
          return res.json({ message: "User Already Exists..." });
        }
    
        const AdminSignupData = await AdminSignupModal.create({
            username,
            email,
            password
        })
    
        return res.json({message:"Admin Signup Successfully..." , AdminSignupData});
    } 
    catch (error) {
        return res.json({message:"Error Occur In Admin Signup... " , error})
    }
})

module.exports = router;
const express = require("express");
const router = express.Router();

const AdminVillasModal = require("../../../Admin/Backend/Models/Villas_Modles");

router.get("/",async(req,res)=>{

    const AdminSideVillas = await AdminVillasModal.find({});

    // console.log(AdminSideVillas);
    

    res.json({message:"Villas Api SuccessFully...", AdminSideVillas});
})

module.exports = router;
const express = require("express");
const router = express.Router();
const Villa = require("../Models/Villas_Modles")

router.delete("/:id",async(req,res)=>{

    const { id } = req.params;
    // console.log("Delete Villa Id: " , id);

    try {
        // Find the villa by ID and delete it
        const deletedVilla = await Villa.findByIdAndDelete(id);

        if (!deletedVilla) {
            return res.status(404).json({ message: "Villa not found" });
        }

        // Send success response if villa is deleted
        res.status(200).json({ message: "Villa deleted successfully" });
    } catch (error) {
        // Send error response if something goes wrong
        console.error("Error deleting villa:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
})

module.exports = router;
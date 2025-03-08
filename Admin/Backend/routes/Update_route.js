const express = require("express");
const router = express.Router();

const Villas = require("../Models/Villas_Modles");

const path = require("path");
const multer = require("multer");


// Set up Multer to store images in 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

// Update villa data
router.put("/:id", upload.single("image"), async (req, res) => {

  const { id } = req.params;
  const updateData = req.body;
  // console.log(updateData);

  try {
    // Check if a new image file is uploaded
    if (req.file) {
      updateData.image = req.file.filename; // Store the new image filename
    }

    // Find villa by ID and update
    const villaData = await Villas.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!villaData) {
      return res.status(404).json({ message: "Villa not found" });
    }

    return res.json({ message: "Villa updated successfully", villaData });
  } catch (error) {
    console.log("Error updating villa: ", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// get/Show villa Data
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const UpdateData = await Villas.findById(id);
  // console.log("Get: " ,UpdateData);

  return res.json({ message: "Update Villa...", UpdateData });
});

module.exports = router;

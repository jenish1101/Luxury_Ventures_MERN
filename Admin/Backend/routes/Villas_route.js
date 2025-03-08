const express = require("express");
const router = express.Router();

const VillasModel = require("../Models/Villas_Modles");

const path = require("path");
const multer = require("multer");


// Set up Multer to store images in 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/Images');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


router.post("/", upload.single('image'), async (req, res) => {
    
  const {
    id,
    name,
    location,
    category,
    guests,
    bedrooms,
    bathrooms,
    squareMeter,
    rating,
    dailyRent,
    src,
  } = req.body;

  // Save the file path
  // console.log(req.file);
  // console.log(" Upload...",
  //   id,
  //   name,
  //   location,
  //   category,
  //   guests,
  //   bedrooms,
  //   bathrooms,
  //   squareMeter,
  //   rating,
  //   image,
  //   dailyRent,
  //   src
  // );


  // Check if an image file is uploaded
  const imageFile = req.file ? req.file.filename : null;

  // Check Villa Already Exists Or Not By Villa Id 
  const Villexist = await VillasModel.findOne({ id });
  // console.log(Villexist);
  if (Villexist) {
    return res.json({ message: "Villa Already Exists..." });
  }


  const VillasDetais = await VillasModel.create({
    id,
    image: imageFile,
    name,
    location,
    category,
    guests,
    bedrooms,
    bathrooms,
    squareMeter,
    rating,
    dailyRent,
    src,
  });

  return res.json({ message: "Villa Added..." ,  VillasDetais});
});

module.exports = router;

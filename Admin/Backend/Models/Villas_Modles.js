const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/LuxuryVentures");

const VillaSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    
  },
  category: {
    type: String,
    
  },
  guests: {
    type: Number,
    
  },
  bedrooms: {
    type: Number,
    
  },
  bathrooms: {
    type: Number,
    
  },
  squareMeter: {
    type: String,
    
  },
  rating: {
    type: Number,
    
  },
  image: {
    type: String, // Path to the uploaded image
    
  },
  dailyRent: {
    type: String,
    
  },
  src: {
    type: String,
    
  }
});

module.exports = mongoose.model("Villa", VillaSchema);  

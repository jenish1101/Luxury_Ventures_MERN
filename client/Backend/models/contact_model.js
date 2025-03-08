const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/LuxuryVentures");

const Contact = mongoose.Schema({
    name : {
        type : String,
        require : true,
        lowercase : true,
        trim : true,
    },
    email : {
        type : String,
        require : true,
    },
    msg : {
        type: String,
        require : true,
        lowercase : true,
        trim : true,
    },
    answer: { 
        type: String 
    }
},{timeStamp:"true"})

module.exports = mongoose.model("contact",Contact);
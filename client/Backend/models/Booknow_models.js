const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/LuxuryVentures");

const BookNow = mongoose.Schema({
    villaName: {
        type: String,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        lowercase: true,
        trim: true,
    },
    surname: {
        type: String,
        lowercase: true,
        trim: true,
    },
    mobile: {
        type: String,
        
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
    },
    country: {
        type: String,
        lowercase: true,
        trim: true,
    },
    city: {
        type: String,
        lowercase: true,
        trim: true,
    },
    date: {
        type: Date,
        
    },
    numberOfSeats: {
        type: Number,
        
    },
    numberOfDays: {
        type: Number,
        
    },
    payment: {
        type: Boolean,
        
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("bookNow", BookNow);

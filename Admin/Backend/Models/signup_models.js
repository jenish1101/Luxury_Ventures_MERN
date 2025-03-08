const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/LuxuryVentures");

const SignupModel = mongoose.Schema({
    username:{
        type:String,
        require:true,
        lowercase : true,
        trim : true,
        unique : true,
    },
    email:{
        type: String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
});

module.exports = mongoose.model("adminsignupdata",SignupModel);
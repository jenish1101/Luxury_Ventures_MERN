const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/LuxuryVentures");

const SignupModel = mongoose.Schema({
    name:{
        type:String,
        require:true,
        lowercase : true,
        trim : true,
    },
    email : {
        type  : String,
        // unique : true,
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
    // confirmpassword : {
    //     type : String,
    //     require : true,
    // }
});

module.exports = mongoose.model("signupdata",SignupModel);
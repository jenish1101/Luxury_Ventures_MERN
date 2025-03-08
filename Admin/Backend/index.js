const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
// Serve static files from the 'public' folder
app.use(express.static('public'));


// MongoDb Connection 
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/LuxuryVentures");

//Routes

const AdminSignup = require("./routes/signup_route");
const AdminLogin = require("./routes/Login_route");
const AdminBooking = require("./routes/Booking_route");
const UserQuery = require("./routes/UserQuery_route");
const AdminAbout = require("./routes/About_route");
const AdminTermsAndCondition = require("./routes/Terms_route");

const AddVillas = require("./routes/Villas_route");
const ShowVillas = require("./routes/ShowVillas_Route");

const AdminDeleteVillas = require("./routes/Delete_route");
const AdminUpdateVillas = require("./routes/Update_route");

app.use("/adminsignup",AdminSignup)
app.use("/adminlogin",AdminLogin);
app.use("/adminbooking",AdminBooking);
app.use("/userquery",UserQuery);
app.use("/adminabout",AdminAbout);
app.use("/adminterms",AdminTermsAndCondition);
app.use("/addvillas",AddVillas);
app.use("/showvillas",ShowVillas);
app.use("/admindelete",AdminDeleteVillas);
app.use("/adminupdate",AdminUpdateVillas);

app.listen(3001);
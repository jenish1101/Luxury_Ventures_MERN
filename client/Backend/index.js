const express = require('express')
const app = express()
const port = 3000

const cors = require("cors")

//InBuild middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin : ["http://localhost:5173"],
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}))
app.use(express.static("public"))


//Router
const Signup = require("./routes/signup_route");
const Login = require("./routes/login_route");
const Home = require("./routes/Home_route");
const Contact = require("./routes/contact_route");
const About = require("./routes/about_route");
const Villas = require("./routes/villas_route");
const Logout = require("./routes/Logout_route");
const BookNow = require("./routes/Booknow_route");
const YourBooking = require("./routes/YourBooking_route");

const VillasApi = require("./routes/villas_api_rute");

const verifyAccessToken = require("./middleware/auth");

app.use("/signup",Signup);
app.use("/login",Login);
// app.use("/",verifyAccessToken,Home);
app.use("/",Home);
app.use("/contact",Contact);
app.use("/about",About);
app.use("/villas",Villas);
app.use("/logout",Logout);
app.use("/booknow",BookNow);
app.use("/yourbooking",YourBooking);
app.use("/villasapi",VillasApi);

// app.get("/",verifyAccessToken,async(req,res)=>{
//   res.json({message:"Home Page..."})
// })

app.get("/logout",async(req,res)=>{
  res.json({message:"Logout..."})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
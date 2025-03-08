const express = require("express");
const router = express.Router();

const contact = require("../models/contact_model");

const verifyAccessToken = require("../middleware/auth");

// Router For Get/Receive User Query
router.post("/", verifyAccessToken, async (req, res) => {
  const { name, email, msg } = req.body;

  // console.log(name,email,msg);

  const ContactData = await contact.create({
    name,
    email,
    msg,
  });

  return res.json({ message: "Contact Details Send...", ContactData });
});

// Router For Send User Query Answers
router.get("/answer", verifyAccessToken, async (req, res) => {
  try {
    //   const question_answer = await contact.find({});
    // Fetch only documents where the `answer` field exists and is not an empty string
    const question_answer = await contact.find({
      answer: { $exists: true, $ne: "" },
    });

    const LoginUser = req.user.email;
    // console.log(LoginUser);
  
    
    // console.log(question_answer);
    return res.json({ message: "User_Query_Answer: ", question_answer , LoginUser});
  } 
  catch (error) {
    console.log("User_Query_Error_Backend: ", error);
  }
});

module.exports = router;

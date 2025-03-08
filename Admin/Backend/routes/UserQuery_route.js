const express = require("express");
const route = express.Router();

// Import UserQueryModal(ContactModal) From Client Side Folder To Backend Folder
const UserQueryModal = require("../../../client/Backend/models/contact_model");

// For Verify Admin Have AcessToken Or Not
const AdminVerifyAccessToken = require("../Middleware/auth");

route.get("/", AdminVerifyAccessToken, async (req, res) => {
  const UserQueryData = await UserQueryModal.find({});
  // console.log(UserQueryData);

  return res.json({
    message: "UserQuery Display Successfully...",
    UserQueryData,
  });
});

// Add a route to save the admin's answer
route.post("/answer", AdminVerifyAccessToken, async (req, res) => {
  const { id, answer } = req.body;
  console.log("Id : " + id + " ANSWER : " + answer);

  try {
    const userQuery = await UserQueryModal.findById(id);
        if (!userQuery) {
            return res.status(404).json({ error: "Query not found" });
        }
    
    // console.log(UserQueryEmail);
    // Update the answer field in the document (Here Enter answer which is enter by admin in UserQueryEmail which is cliet side modal for user)
    userQuery.answer = answer;
    await userQuery.save();

    return res.json({ message: "Answer Submitted..." });
  } catch (error) {
    console.log("User_Query_Error_Backend: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = route;

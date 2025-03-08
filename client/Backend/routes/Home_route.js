const express = require("express");
const router = express.Router();

const verifyAccessToken = require("../middleware/auth")

router.get("/" , verifyAccessToken , async (req, res) => {
  res.json({ message: "Home Page..." });
});

module.exports = router;
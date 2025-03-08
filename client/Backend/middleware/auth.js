const jwt = require("jsonwebtoken"); //For Authentication

//For Verify AccessToken (If User Have A Access Token Than he is Valid User)
const verifyAccessToken = async (req, res, next) => {
    try {
  
      const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token
      // console.log("AUTH MIDDLEWARE: ", token);
  
      if (!token) {
        console.log("AUTH: Token Not Avaliable");
        // return res.json("The token was not avaliable");
        return res.status(401).json({ error: "Unauthorized" });
      } 
      else 
      {
        jwt.verify(token, "JwtTokenSecretKey", (err, decoded) => {
          if (err){
            return res.status(401).json({ error: "Token is invalid or expired" });
          }
  
          req.user = decoded;
          next();
  
        });
      }
  
    } 
    catch (error) {
      // console.log("Auth Error...");
      res.status(401).json({ error: "unauthorized cath" });
    }
  };
  
  
  module.exports = verifyAccessToken;
  
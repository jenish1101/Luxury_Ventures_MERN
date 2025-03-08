const jwt = require("jsonwebtoken"); //For Authentication

//For Verify AccessToken (If User Have A Access Token Than It's Comform he is Valid User)
const verifyAccessToken = async (req, res, next) => {
    try {
  
      const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token
  
      if (!token) {
        console.log("AUTH: Token Not Avaliable");
        return res.status(401).json({ error: "Unauthorized(AUTH: Token Not Avaliable)" });
      } 
      else 
      {
        // For Verify Jwt Token 
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
  
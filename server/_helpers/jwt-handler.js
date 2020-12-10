const jwt = require("jsonwebtoken");

const jwtDecode = (token, secret) => {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.json({ auth: false, message: "Your token is incorrect" });
    } else {
      //get user info using decoded
      console.log("JWT token should be correct");
      console.log("Decoding...");
      console.log("Decoded is below");
      console.log(decoded);
      return decoded;
    }
  });
};

module.exports = { jwtDecode };

const jwt = require("jsonwebtoken");

const jwtDecode = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("Yo we need a token, please give it to us next time!");
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U failed to authenticated" });
      } else {
        //get user info using decoded
        console.log("JWT token should be correct");
        console.log("Decoding...");
        console.log("Decoded is below");
        console.log(decoded);
        req.userId = decoded.id;
        req.userName = decoded.name;
        next();
      }
    });
  }
};

module.exports = { jwtDecode };

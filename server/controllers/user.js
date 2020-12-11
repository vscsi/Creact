const knex = require("../models/knex");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

exports.getUserName = async (req, res) => {
  try {
    //1. decode the userId from token in header
    const token = req.headers["x-access-token"];
    console.log("Hi, get request from /username");
    let userId;
    let userName;
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Your token is incorrect" });
      } else {
        //get user info using decoded
        // console.log("JWT token should be correct");
        // console.log("Decoding...");
        // console.log("Decoded is below");
        // console.log(decoded);
        userId = decoded.id;
        userName = decoded.name;
      }
    });
    const returnUser = await knex("users").where({
      id: userId,
    });
    console.log("users rendering from db");
    console.log(returnUser);
    res.json({ userName: returnUser[0].username });
  } catch (error) {
    console.error(error.message);
  }
};

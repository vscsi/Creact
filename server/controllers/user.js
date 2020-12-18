const knex = require("../models/knex");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

exports.getUserName = async (req, res) => {
  try {
    //1. decode the userId from token in header
    // console.log("Hi, get request from /username");
    let userId = req.userId;
    let userName = req.userName;
    const returnUser = await knex("users").where({
      id: userId,
    });
    // console.log("users rendering from db fuck you");
    // console.log(returnUser[0].id);
    res.json({ userName: returnUser[0].username, id: returnUser[0].id });
  } catch (error) {
    console.error(error.message);
  }
};

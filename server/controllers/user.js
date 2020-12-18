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

exports.checkLoginUsers = async (req, res) => {
  try {
    //if user log in, will save the userName into loginusers
    //if user log out, will remove the userName from loginusers
    console.log(`in checkLoginUsers route`)
    let loginUsers = [];
    console.log(loginUsers);
    //when user first login, in dashboardprofilecontinaer
    if (req.body.userName === "") {
      loginUsers.push({name: req.userName});
    } else {
      //have data post to this route
      loginUsers = loginUsers.filter((item, index) => {
        return item.name !== req.body.userName;
      });
    }
    console.log(loginUsers);
    res.json({ loginUsers: loginUsers });
  } catch (error) {
    console.error(error.message);
  }
};

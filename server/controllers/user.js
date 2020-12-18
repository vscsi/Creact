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
    console.log(`in checkLoginUsers route`);
    // let loginUsers = [];
    // console.log(loginUsers);
    //when user first login, in dashboardprofilecontinaer
    if (req.body.userName === "") {
      //if db dont have this username yet
      const returnUserName = await knex("login_users")
        .where({
          username: req.userName,
        })
        .select("*");
      if (returnUserName.length === 0) {
        await knex("login_users").insert({
          username: req.userName,
        });
      }

      // loginUsers.push({name: req.userName});
    } else {
      //if user want to logout, delete his username
      const logoutUserName = req.body.userName;
      await knex("login_users")
        .where({
          username: logoutUserName,
        })
        .del();
    }
    const returnLoginUsers = await knex("login_users").select("*");
    console.log(`returnLoginUsers is below`);
    console.log(returnLoginUsers);
    res.json({ loginUsers: returnLoginUsers });
  } catch (error) {
    console.error(error.message);
  }
};

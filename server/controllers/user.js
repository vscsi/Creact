const knex = require("../models/knex");
// const Buffers = require("buffers");
var Buffer = require("buffer/").Buffer;

// const jwt = require("jsonwebtoken");
// const config = require("../config.json");

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
    // console.log(returnUser);
    const bufs = Buffer.from(returnUser[0].img);
    // const bufs = Buffers(returnUser[0].img).buffers;
    const base64 = bufs.toString();
    // let buff = buffer.from(returnUser[0].img);
    // let base64 = buff.toString('base64');
    // console.log(`buff is below`);
    // console.log(returnUser[0].img)
    // console.log(base64);
    // console.log(imgData)
    // console.log(returnUser[0].id);
    res.json({
      userName: returnUser[0].username,
      id: returnUser[0].id,
      userImg: base64,
      firstName: returnUser[0].first_name,
      lastName: returnUser[0].last_name,
      email: returnUser[0].email
    });
  } catch (error) {
    console.error(error.message);
  }
};


exports.checkLoginUsers = async (req, res) => {
  try {
    //if user log in, will save the userName into loginusers
    //if user log out, will remove the userName from loginusers
    console.log(`in checkLoginUsers route`);
    // console.log(loginUsers);
    //when user first login, in dashboardprofilecontinaer

    //if db dont have this username yet
    const returnUserName = await knex("login_users")
      .where({
        username: req.userName,
      })
      .select("*");
    console.log(`returnUserName is below`);
    console.log(returnUserName);
    if (returnUserName.length === 0) {
      await knex("login_users").insert({
        username: req.userName,
      });
    }

    // else {
    //   //if user want to logout, delete his username
    //   console.log(`req.body.userName is below`);
    //   console.log(req.body.userName);
    //   const logoutUserName = req.body.userName;
    //   await knex("login_users")
    //     .where({
    //       username: logoutUserName,
    //     })
    //     .del();
    // }
    const returnLoginUsers = await knex("login_users").select("*");
    console.log(`returnLoginUsers is below`);
    console.log(returnLoginUsers);
    res.json({ loginUsers: returnLoginUsers });
  } catch (error) {
    console.error(error.message);
  }
};

exports.removeLoginUsers = async (req, res) => {
  try {
    console.log(`in checkLogoutUsers route`);
    console.log(req.params);
    const removeUser = req.params.userName;
    await knex("login_users")
      .where({
        username: removeUser,
      })
      .del();
    const currUsers = await knex("login_users").select("*");
    console.log(`currUsers are below`);
    console.log(currUsers);
    console.log("has removed users from login_users table");
    res.json({ user: removeUser, currUsers: currUsers });
  } catch (error) {
    console.error(error.message);
  }
};

exports.changeUserInfo = async (req,res) => {
  
  const {username, email} = req.body;
  console.log(req.body, 'changeUserInfo')
  try{
     await knex('users')
      .where({
        username: username
      })
      .update({
        email: email,
      })
      ;
    res.json({
      emailChanged: true,
      email: email,
    })
  }catch(error){
    console.error(error.message);
  }
};

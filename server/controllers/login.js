const knex = require("../models/knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../config.json');

exports.postLogin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const account = await knex("users")
      .where({ username: username })
      .select("id", "username", "user_pw");
    console.log(account);
    // if (account.length === 0) throw "Username or password is incorrect";

    if (!account || !bcrypt.compareSync(password, account[0].user_pw)) {
      throw "Username or password is incorrect";
    } else {
      //create a jwt token that is valid for 7 days
      const token = jwt.sign({ id: account[0].id, name: account[0].username}, config.secret, {
        expiresIn: "7d",
      });
      console.log("Token");
      console.log(token);
      // req.session.user = user;
      res.json({
        auth: true,
        accessToken: token,
        userName: account[0].username,
        userId: account[0].id,
        message: "Your password is same as hashed ones, will issue JWT to u",
      });
    }
  } catch (error) {
    res.json({ auth: false, message: "User doesnt exist" });
  }
};

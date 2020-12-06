const config = require("../config.json");
const jwt = require("jsonwebtoken");
const knex = require("../models/knex");

async function authenticate({ username, password }) {
  //find if username and password matches the one in db
  const user = await knex("users")
    .where({
      username: username,
      user_pw: password,
    })
    .select("id", "username", "user_pw");
  console.log("The user response back from db");
  console.log(user);
  if (user.length === 0) throw "Username or password is incorrect";

  //create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "7d" });

  return {
    ...omitPassword(user[0]),
    token,
  };
}

async function getAll() {
  const users = await knex.select().table("users");
  console.log("All user response back from db");
  console.log(users);
  //get all users info without pw
  return users.map((u) => omitPassword(u));
}

function omitPassword(user) {
  const { user_pw, ...userInfoWithoutPassword } = user;
  return userInfoWithoutPassword;
}

module.exports = {
  authenticate,
  getAll,
};

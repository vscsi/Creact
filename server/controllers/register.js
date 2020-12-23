const knex = require("../models/knex");
const bcrypt = require("bcrypt");

exports.getRegister = async (req, res) => {};
exports.postRegister = async (req, res) => {
  console.log(`in register route`);
  const { username, firstname, lastname, email, password, image} = req.body;
  // const img = req.file;
  // console.log(req.file);
  // console.log(img);
  // console.log(req.body);
  // console.log(req.body.image);
  let query;
  let hashedPassword = await bcrypt.hash(password, 10);
  try {
    query = await knex.from("users").select().where("username", username);
    if (query.length > 0) {
      // console.log('from server/register.js__username is already registered, please pick a new one')
      res.json({ userNameRepeated: true });
    } else if (
      username !== "" &&
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      password !== ""
    ) {
      await knex("users").insert({
        username: username,
        user_pw: hashedPassword,
        first_name: firstname,
        last_name: lastname,
        email: email,
        img: image, 
      });
      res.json({ userNameRepeated: false });
    }
  } catch (e) {
    console.error(e.message);
  }
};

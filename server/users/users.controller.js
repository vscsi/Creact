const express = require("express");
const router = express.Router();
const userService = require("./user.service");

function authenticate(req, res, next) {
  //send back the userInfo and toker in a obj to client
  userService
    .authenticate(req.body)
    .then((user) => {
      console.log("Rendering in server");
      console.log(
        "Authenticate this user, sending back this user info with token + other info except pw"
      );
      res.json(user);
    })
    .catch(next);
}

function getAll(req, res, next) {
  //send back all userInfo in a obj to client
  userService
    .getAll()
    .then((users) => {
      console.log("Rendering in server");
      console.log("Geting all users back with all info except pw");
      res.json(users);
    })
    .catch(next);
}

//routes
router.post("/authenticate", authenticate);
router.get("/", getAll);

module.exports = router;

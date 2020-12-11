const knex = require("../models/knex");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

exports.getTasks = async (req, res, next) => {
  try {
    const allTasks = await knex("task")
      .orderBy("deadline")
      .join("users", "users.id", "task.user_id")
      .select(
        "task.id",
        "task.task_name",
        "task.task_content",
        "task.deadline",
        "users.first_name"
      );

    console.log("get tasks from database");
    console.log(allTasks);
    res.json(allTasks);
  } catch (error) {
    console.error(error.message);
  }
};

exports.postTask = async (req, res, next) => {
  try {
    //1. decode the userId from token in header
    const token = req.headers["x-access-token"];
    console.log("Hi, post request from /post");
    console.log(token);
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
    const { taskName, taskContent, taskDeadline, taskUser } = req.body;
    console.log(req.body);
    await knex("task").insert({
      task_name: taskName,
      task_content: taskContent,
      deadline: taskDeadline,
      user_id: taskUser,
    });
    res.send("Data has inserted into table");
  } catch (error) {
    console.error(error.message);
  }
};

exports.deleteTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await knex("task").where("id", id).del();
    res.json("Task is deleted");
  } catch (error) {
    console.error(error.message);
  }
};

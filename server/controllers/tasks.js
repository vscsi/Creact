const knex = require("../models/knex");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

exports.getTasks = async (req, res, next) => {
  try {
    console.log(`get request from /tasks route`);
    console.log(`run from jwt middleware`);
    console.log(req.userId);
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
    console.log(`get request from /workspace/tasks route`);
    console.log(`run from jwt middleware`);
    console.log(req.userId);
    const token = req.headers["x-access-token"];
    console.log("Hi, post request from /post");
    console.log(token);
    let userId;
    let userName;
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

exports.postCheckAdmin = async (req, res) => {
  try {
    console.log("In /task/checkadmin");
    console.log(req.headers["x-access-token"]);
    const { workspaceName } = req.body;
    console.log(`useId = ${req.userId}`);
    console.log(`workspaceName = ${workspaceName}`);
    //1. find the workspaceId from workspace table
    const returnWorkspace = await knex("workspace")
      .where({ workspace_name: workspaceName })
      .select("*");
    console.log(`workspace is below`);
    console.log(returnWorkspace);
    // const returnResult = await knex("user_workspace")
    //   .where({
    //     workspace_id: workspaceId,
    //     user_id: userId,
    //   })
    //   .select("*");
    console.log("Checking workspaceAdmin from db");
    // console.log(returnResult);
  } catch (error) {
    console.error(error.message);
  }
};

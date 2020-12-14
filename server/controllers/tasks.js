const knex = require("../models/knex");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

exports.postTasks = async (req, res, next) => {
  try {
    console.log(`post request from /tasks route`);
    // console.log(`workspaceName = ${req.body.workspaceName}`);
    //1. get the workspaceId first
    const returnWorkspace = await knex("workspace").where({
      workspace_name: req.body.workspaceName,
    });
    // console.log(`returnWorkSpace is below`);
    // console.log(returnWorkspace);
    const workspaceId = returnWorkspace[0].id;
    // console.log(`workspaceId = ${workspaceId}`);
    //2. should be get the task of that workspace
    // const allTasks = await knex("task")
    //   .orderBy("deadline")
    //   .join("users", "users.id", "task.user_id")
    //   .select("*");
    const allTasks = await knex("task_workspace")
      .where({
        workspace_id: workspaceId,
      })
      .select("*");
    // console.log("get all tasks from database");
    // console.log(allTasks);
    //3. base on the task_id to query in task table
    const allTasksInfo = [];
    for (let task of allTasks) {
      //**userId need to convert to userName
      const taskId = task.task_id;
      const eachTask = await knex("task")
        .where({
          id: taskId,
        })
        .select("*");
      // console.log(`eachTask is below`)
      // console.log(eachTask);
      const userId = eachTask[0].user_id;
      const returnUsername = await knex('users').where({
        id: userId
      }).select('*');
      // console.log(`returnUsername is below`);
      // console.log(returnUsername);
      const userName = returnUsername[0].username;
      // console.log(`userName is ${userName}`);
      // console.log(`userId is ${userId}`);
      const eachObj = {...eachTask[0], userName};
      // console.log(`eachObj is below`);
      // console.log(eachObj);
      allTasksInfo.push(eachObj);
    }
    console.log(`allTasksInfo is below`);
    console.log(allTasksInfo);
    res.json(allTasksInfo);
  } catch (error) {
    console.error(error.message);
  }
};

exports.postTask = async (req, res, next) => {
  try {
    console.log(`post request from /task route`);
    const {
      taskName,
      taskContent,
      taskDeadline,
      taskUser,
      currentWorkspace,
    } = req.body;
    console.log("req.body");
    console.log(req.body);
    const returnWorkspace = await knex("workspace").where({
      workspace_name: currentWorkspace,
    });
    console.log(`returnWorkSpace is below`);
    console.log(returnWorkspace);
    const workspaceId = returnWorkspace[0].id;
    console.log(`workspaceId = ${workspaceId}`);
    //0. should check if the task name is already duplicated
    const findTask = await knex("task")
      .where({
        task_name: taskName,
      })
      .select("*");
    //if no duplicate, then can insert
    if (findTask.length === 0) {
      await knex("task").insert({
        task_name: taskName,
        task_content: taskContent,
        deadline: taskDeadline,
        user_id: taskUser,
      });
      const returnTask = await knex("task").where({
        task_name: taskName,
        task_content: taskContent,
        deadline: taskDeadline,
        user_id: taskUser,
      });
      console.log(`returnTask is below`);
      console.log(returnTask);
      const returnTaskId = returnTask[0].id;
      console.log(`returnTaskId = ${returnTaskId}`);
      await knex("task_workspace").insert({
        workspace_id: workspaceId,
        task_id: returnTaskId,
        user_id: taskUser,
      });
      res.send("Data has inserted into table");
    } else {
      res.send("There is already same task in databse!");
    }
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

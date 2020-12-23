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
      const returnUsername = await knex("users")
        .where({
          id: userId,
        })
        .select("*");

      const deadline = eachTask[0].deadline;
      const convertDeadline = new Date(deadline).toLocaleString("zh-HK", {
        timeZone: "UTC",
      });
      console.log(`deadline is below`);
      console.log(deadline);
      console.log(convertDeadline);

      // console.log(`returnUsername is below`);
      // console.log(returnUsername);
      const userName = returnUsername[0].username;
      // console.log(`userName is ${userName}`);
      // console.log(`userId is ${userId}`);
      const eachObj = { ...eachTask[0], userName, deadline: convertDeadline };
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
    console.log(`delete from '/tasks/id`);
    const { id } = req.params;
    //1. delete from task_workspace
    const userId = req.userId;
    console.log(`taskId = ${id}`);
    console.log(`userId = ${userId}`);
    const deleteTaskWorkspace = await knex("task_workspace")
      .where({
        task_id: id,
        user_id: userId,
      })
      .del();
    //2. delete from task
    const deleteTask = await knex("task").where("id", id).del();
    res.json("Task is deleted");
  } catch (error) {
    console.error(error.message);
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    console.log("In /task/usertasks");
    // console.log(req.userId);
    const returnUserWP = await knex("user_workspace").where({
      user_id: req.userId,
    });
    // console.log(`returnUserWP is below`);
    // console.log(returnUserWP);
    let allTasks = [];
    let allTasksInfo = [];
    for (let wp of returnUserWP) {
      const eachWorkspaceId = wp.workspace_id;
      const returnTasks = await knex("task_workspace").where({
        workspace_id: eachWorkspaceId,
        user_id: req.userId,
      });
      // console.log(`returnTasks is below`);
      // console.log(returnTasks);
      for (let task of returnTasks) {
        allTasks.push(task);
      }
    }
    // console.log(`allTasks is below`);
    // console.log(allTasks);

    for (let each of allTasks) {
      let eachObj = {};
      const eachWorkspaceId = each.workspace_id;
      const eachTaskId = each.task_id;
      const eachUserId = each.user_id;
      const eachWorkspaceInfo = await knex("workspace").where({
        id: eachWorkspaceId,
      });
      const eachTaskInfo = await knex("task").where({
        id: eachTaskId,
      });
      const eachUserInfo = await knex("users").where({
        id: eachUserId,
      });
      // console.log(`eachWorkspaceInfo`);
      // console.log(eachWorkspaceInfo);
      // console.log(`eachTaskInfo`);
      // console.log(eachTaskInfo);
      // console.log(`eachUserInfo`);
      // console.log(eachUserInfo);
      eachObj = {
        workspaceName: eachWorkspaceInfo[0].workspace_name,
        title: eachTaskInfo[0].task_name,
        content: eachTaskInfo[0].task_content,
        date: new Date(eachTaskInfo[0].deadline).toLocaleString("zh-HK", {
          timeZone: "UTC",
        }),
        userName: eachUserInfo[0].username,
      };
      allTasksInfo.push(eachObj);
    }
    console.log(`allTasksinfo is below`);
    console.log(allTasksInfo);
    res.json({ allTasks: allTasksInfo });
  } catch (error) {
    console.error(error.message);
  }
};

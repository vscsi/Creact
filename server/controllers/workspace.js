const knex = require("../models/knex");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

exports.createWorkspace = async (req, res) => {
  try {
    const { workspaceName, maxppl, workspacePassword } = req.body;
    // console.log(req.body);
    let userId = req.userId;
    let userName = req.userName;
    let workspace;
    let workspaceId;
    //check if workspaceName is used in db
    //if yes, send res to client, "workspacename is used"
    //also, need to know is which user create the workspace
    //2. insert the 2nd query into user_workspace table, set the workspace_admin = true
    workspace = await knex("workspace")
      .where({
        workspace_name: workspaceName,
      })
      .select("id", "workspace_name", "max_user");
    console.log(workspace);
    if (workspace.length === 0) {
      // console.log("DB dont have this data yet");
      //2. get back the userId, which user create this workspace
      //Check if user has created more than 5 workspaces (check from user_workspace)
      //if no, can allow create
      //if yes, than can not insert
      const userWorkspaces = await knex("user_workspace").where({
        user_id: userId,
      });
      if (userWorkspaces.length >= 5) {
        //need to show alert box may be in client
        return res.json({
          message:
            "You have created 5 workspaces already, please buy the premier to create more worksapces",
        });
      } else {
        // console.log("userWorkspaces is below");
        // console.log(userWorkspaces);
        //1. if no, insert the data into workspace table
        await knex("workspace").insert({
          workspace_name: workspaceName,
          max_user: maxppl,
          workspace_password: workspacePassword,
        });

        // console.log("workspace data has inserted into db");
        //3. get back the workspaceId just inserted
        workspace = await knex("workspace")
          .where({
            workspace_name: workspaceName,
          })
          .select("id", "workspace_name", "max_user");
        // console.log("After insert, get data back again");
        // console.log(workspace);
        workspaceId = workspace[0].id;
        //4. insert both info into user_workspace table,
        await knex("user_workspace").insert({
          workspace_id: workspaceId,
          user_id: userId,
          workspace_admin: true,
        });
        // console.log("Data has inserted into user_workspace table");
      }
    } else {
      res.json({
        isRegistered: true,
        message:
          "Workspace name has been registered, Please register another one",
      });
    }
    // res.json({workspace: workspace});
  } catch (error) {
    console.error(error.message);
  }
};

exports.getWorkSpace = async (req, res) => {
  try {
    //1. decode the userId from token in header
    // console.log("Hi, get request from /workspace/list");
    let userId = req.userId;
    let userName = req.userName;
    const userWorkspaces = [];
    //2. q1: search the user_workspace table base on the userID
    //3. return the array with all the workspaceID
    const returnUserWorkspaces = await knex("user_workspace").where({
      user_id: userId,
    });
    // console.log("user_workspaces rendering from db");
    // console.log(returnUserWorkspaces);
    //4. q2: search the workspace table base on each workspaceID
    for (let item of returnUserWorkspaces) {
      let eachworkspaceId = item.workspace_id;
      let isWorkspaceAdmin = item.workspace_admin;

      let eachWorkspace = await knex("workspace").where({
        id: eachworkspaceId,
      });
      const eachWorkspaceName = eachWorkspace[0]["workspace_name"];
      const eachObj = {
        eachWorkspaceName,
        isWorkspaceAdmin,
      };
      // console.log(`eachObj is below`);
      // console.log(eachObj);
      userWorkspaces.push(eachObj);
      // console.log("Render each workspace from db");
      // console.log(eachWorkspace);
    }
    //5. store all the workspace name into json obj and pass back to client
    // console.log(`userWorkspaces is below`);
    // console.log(userWorkspaces);
    res.json({ userWorkspaces: userWorkspaces });
  } catch (error) {
    console.error(error.message);
  }
};

exports.getAllWorkspaces = async (req, res) => {
  try {
    // console.log("In /workspace/all");
    const returnAllWorkspaces = await knex("workspace").select(
      "id",
      "workspace_name",
      "max_user"
    );
    const allWorkspaces = [];
    //1. for each workspace name, check how many users inside the workspace
    for (let workspace of returnAllWorkspaces) {
      //3. base on that workspace id, find the length of user_workspace
      const workspaceId = workspace.id;
      const returnUserWorkspace = await knex("user_workspace").where({
        workspace_id: workspaceId,
      });
      const numOfUsers = returnUserWorkspace.length;
      const eachObj = { ...workspace, numOfUsers };
      // console.log(`numOfUsers = ${numOfUsers}`);
      // console.log(`workspace is below`);
      // console.log(workspace);
      allWorkspaces.push(eachObj);
    }
    // console.log(`allWorkspaces is below`);
    // console.log(allWorkspaces);
    res.json(allWorkspaces);
  } catch (error) {
    console.error(error.message);
  }
};

exports.postCheck = async (req, res) => {
  try {
    console.log("In /workspace/check");
    const { workspaceName } = req.body;
    // console.log(`userId = ${req.userId}`);
    // console.log(`workspaceName = ${workspaceName}`);
    //1. find the workspaceId from workspace table
    const returnWorkspace = await knex("workspace")
      .where({ workspace_name: workspaceName })
      .select("*");
    // console.log(`workspace is below`);
    // console.log(returnWorkspace);
    const workspaceId = returnWorkspace[0].id;
    const workspacePassword = returnWorkspace[0].workspace_password;
    const returnUserWorkspace = await knex("user_workspace")
      .where({
        workspace_id: workspaceId,
        user_id: req.userId,
      })
      .select("*");
    // console.log("Checking workspaceAdmin from db");
    // console.log(returnUserWorkspace);
    const isAdmin = returnUserWorkspace[0]["workspace_admin"];
    // console.log(isAdmin);

    const returnNumWorkspace = await knex("user_workspace")
      .where({
        workspace_id: workspaceId,
      })
      .select("*");
    // console.log("Checking number of users in workspace from db");
    // console.log(returnNumWorkspace);
    let allUsers = [];
    let firstEmptyUsers = [{ user_name: "Please select user", user_id: 0 }];
    for (let user of returnNumWorkspace) {
      let userId = user.user_id;
      let eachUserInfo = await knex("users").where({
        id: userId,
      });
      allUsers.push({
        user_name: eachUserInfo[0].username,
        user_id: userId,
      });
      // console.log("Each user info");
      // console.log(eachUserInfo);
      firstEmptyUsers.push({
        user_name: eachUserInfo[0].username,
        user_id: userId,
      });
    }
    console.log(allUsers);
    res.json({
      isAdmin: isAdmin,
      allUsers: allUsers,
      firstEmptyUsers: firstEmptyUsers,
      workspacePassword: workspacePassword,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.postJoin = async (req, res) => {
  // console.log(`post from '/workspace/join`);
  const userId = req.userId;
  // console.log(`userId = ${userId}`);
  // console.log(`body = ${req.body.workspaceName}`);
  //1. get the workspace id from the workspace name
  const returnWorkspace = await knex("workspace").where({
    workspace_name: req.body.workspaceName,
  });
  const workspaceId = returnWorkspace[0].id;
  const workspaceMaxUsers = returnWorkspace[0].max_user;
  // console.log(`workspaceId = ${workspaceId}`);
  // console.log(`workspaceMaxUsers = ${workspaceMaxUsers}`);
  //2. check if that userId have that workspace id already
  const returnUserWorkspace = await knex("user_workspace").where({
    workspace_id: workspaceId,
    user_id: userId,
  });
  if (returnUserWorkspace.length === 0) {
    //that means no the 'user_workspace' table dont hv this data yet
    //**check if the workspace has exceeded the max_user */
    //1. get the max_user of that workspace of db
    //2. get how many ppl are inside that workspace
    const returnUsersInWorkspace = await knex("user_workspace").where({
      workspace_id: workspaceId,
    });
    if (returnUsersInWorkspace.length >= workspaceMaxUsers) {
      // console.log("The workspace is full");
      res.json("The workspace is full, the user can not join");
    } else {
      await knex("user_workspace").insert({
        workspace_id: workspaceId,
        user_id: userId,
      });
      // console.log("This user has joined the workspace");
      res.json("The user has joined the workspace successfully");
    }
  } else {
    res.json("The user is already in this workspace");
  }
};

exports.chatroomInit = async (req, res) => {
  const { workspaceName } = req.body;
  let finalResult;
  let result1 = await knex
    .select("id", "max_user")
    .where("workspace_name", workspaceName)
    .from("workspace");

  let workspaceId = result1[0].id;
  let maxNum = result1[0].max_user;
  //  console.log('first step of chatroomIni', workspaceId)

  let step2 = await knex
    .select("*")
    .where("workspace_id", workspaceId)
    .from("workspace_chatroom");
  //  console.log('result of step 2 of chatroomIni', step2)
  if (step2.length === 0) {
    //  console.log('no workspace"s chatroom exist, then insert new chatroom entries and return id ');
    finalResult = await knex("chatroom")
      .insert({ chatroom_type: true })
      .returning("id");
    // console.log('returning of insert chatroom type', finalResult)
    await knex("workspace_chatroom").insert({
      chatroom_id: finalResult[0],
      workspace_id: workspaceId,
    });

    console.log("final result to be res.json from new chatroom", finalResult);
    res.json(finalResult);
  } else {
    //  console.log('workspace already opened chatroom')
    finalResult = await knex
      .select("chatroom_id")
      .where("workspace_id", workspaceId)
      .from("workspace_chatroom");
    console.log("workspace already have chatroom final reult", finalResult);
    res.json(finalResult[0].chatroom_id);
  }
};

exports.postCheckPW = async (req, res) => {
  console.log("checking pw in server");
  console.log(req.body);
  const { workspaceName, workspacePassword } = req.body;
  const returnWorkspace = await knex("workspace")
    .where({
      workspace_name: workspaceName,
      workspace_password: workspacePassword,
    })
    .select("*");
  console.log(`returnWOrkspace`);
  console.log(returnWorkspace);
  if (returnWorkspace.length !== 0) {
    res.json({ wp_password: true });
  } else {
    res.json({ wp_password: false });
  }
};

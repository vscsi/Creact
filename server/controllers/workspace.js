const knex = require("../models/knex");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
// const { jwtDecode } = require("../_helpers/jwt-handler");

exports.createWorkspace = async (req, res) => {
  try {
    const { workspaceName, maxppl } = req.body;
    console.log(req.body);
    const token = req.headers["x-access-token"];
    let userId;
    let userName;
    let workspace;
    let workspaceId;
    console.log(token);
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
      console.log("DB dont have this data yet");
      //2. get back the userId, which user create this workspace
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          res.json({ auth: false, message: "Your token is incorrect" });
        } else {
          //get user info using decoded
          console.log("JWT token should be correct");
          console.log("Decoding...");
          console.log("Decoded is below");
          console.log(decoded);
          userId = decoded.id;
          userName = decoded.name;
        }
      });
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
        console.log("userWorkspaces is below");
        console.log(userWorkspaces);
        //1. if no, insert the data into workspace table
        await knex("workspace").insert({
          workspace_name: workspaceName,
          max_user: maxppl,
        });

        console.log("workspace data has inserted into db");
        //3. get back the workspaceId just inserted
        workspace = await knex("workspace")
          .where({
            workspace_name: workspaceName,
          })
          .select("id", "workspace_name", "max_user");
        console.log("After insert, get data back again");
        console.log(workspace);
        workspaceId = workspace[0].id;
        //4. insert both info into user_workspace table,
        await knex("user_workspace").insert({
          workspace_id: workspaceId,
          user_id: userId,
          workspace_admin: true,
        });
        console.log("Data has inserted into user_workspace table");
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
    const token = req.headers["x-access-token"];
    console.log("Hi, get request from /workspace/list");
    let userId;
    let userName;
    const allWorkspaces = [];
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
    console.log(userId);
    //2. q1: search the user_workspace table base on the userID
    //3. return the array with all the workspaceID
    const userWorkspaces = await knex("user_workspace").where({
      user_id: userId,
    });
    console.log("user_workspaces rendering from db");
    console.log(userWorkspaces);
    //4. q2: search the workspace table base on each workspaceID
    for (let item of userWorkspaces) {
      let eachworkspaceId = item.workspace_id;

      let eachWorkspace = await knex("workspace").where({
        id: eachworkspaceId,
      });
      allWorkspaces.push(eachWorkspace[0]["workspace_name"]);
      console.log("Render each workspace from db");
      console.log(eachWorkspace);
    }
    //5. store all the workspace name into json obj and pass back to client
    console.log(allWorkspaces);
    res.json({ allWorkspaces: allWorkspaces });
  } catch (error) {
    console.error(error.message);
  }
};

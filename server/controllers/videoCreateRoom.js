const knex = require("../models/knex");

exports.postVideoCreateRoom = async(req,res) =>{
  const {name, workspaces, workspaceName, id} = req.body;
  const username = name;
  const roomID = id;


  console.log('from server/videoCreateRoom',name, workspaces, id)
}
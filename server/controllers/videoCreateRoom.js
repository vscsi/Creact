const knex = require("../models/knex");

exports.postVideoJoinRoom = async(req,res)=>{
  const {currentWorkspace} = req.body;
  //current user id
  const userId = req.userId;
  const videoRooms=[];

  try{
    //get users from same workspace 
    let getCurrentWorkspace = await knex('workspace').select().where('workspace_name', currentWorkspace);
    let getUsersFromSameWorkspace = await knex('user_workspace').select().where('workspace_id', getCurrentWorkspace.id);
    
    if(getUsersFromSameWorkspace.length !== 0){
      //check if user is video host
      let getVideoId = await knex('video_workspace').select().where('user_id', userId);
      console.log('server/videoCreateRoom getVideoId',getVideoId);
      
      //if not host, check if there are video rooms in same workspace 
      if(getVideoId.length === 0){
        let getVideoRoomName = await knex('video').select().where('id', getVideoId.video_id);
  
        console.log('server/videoCreateRoom',getVideoRoomName);
        videoRooms.push(getVideoRoomName.video_room_name)
        res.json({
          videoRoomNames: videoRooms
        })
      }else{
        res.json({
          message: 'no video room is created'
        })
      }
    }else{
      res.json({
        message: 'only 1 user in workspace'
      })
    }
 }catch(e){
   console.error(e.message);
 } 
}

exports.postVideoCreateRoom = async(req,res) =>{
  const {name, workspaces, currentWorkspace, id, videoRoomName} = req.body;
  console.log('from server/videoCreateRoom',name, workspaces, currentWorkspace, id, videoRoomName)
  if(videoRoomName!==null){
    try{
      await knex('video').insert({
        video_link_id: id,
        video_room_name: videoRoomName 
      })
      //extract id from video table
      let videoOutput = await knex('video').select().where("video_link_id",id);
      console.log(videoOutput);
  
      //extract id from workspace
      let workspaceOutput = await knex('workspace').select().where("workspace_name",currentWorkspace)
      console.log(workspaceOutput);
      
      //extract id from users
      let usersOutput = await knex('users').select().where("user_name",name)
      console.log(workspaceOutput);

      //insert to video_workspace table 
      await knex('video_workspace').insert({
        video_id: videoOutput.id,
        workspace_id: workspaceOutput.id,
        user_id: usersOutput.id
      })
  
      res.json({
        message: 'server received video creator data',

      })
    }catch(e){
      console.error(e.message)
    }
  }else{
    res.json({
      message: 'room name is empty'
    })
  }
  
}


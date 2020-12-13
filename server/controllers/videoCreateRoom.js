const knex = require("../models/knex");

exports.getVideoConferenceRoom = async(req,res)=>{
  const userId = req.userId;
  try{
    let checkHost = await knex('video_workspace').select().where('user_id', userId);
    if(checkHost.length>0){
      res.json({
        checkHost: true
      })
    }else{
      res.json({
        checkHost: false
      })
    }
  }catch(e){
    console.error(e.message);
  }
}

exports.deleteVideoConferenceRoom = async(req,res)=>{
   //end socket
   //delete record from database
   
}

exports.postVideoJoinRoom = async(req,res)=>{
  const {currentWorkspace} = req.body;
  //current user id
  const userId = req.userId;
  const videoRooms=[];

  try{
    //get users from same workspace , more than 1 user in ws?
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
          message: 'You are the host of the room',
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
  const {userName, workspaces, currentWorkspace, password, room, videoUrl} = req.body;
  try{
  console.log('from server/videoCreateRoom',userName, workspaces, currentWorkspace, password, room, videoUrl)
  if(room!==undefined){
      await knex('video').insert({
        video_room_pw: password,
        video_room_name: room,
        video_room_url: videoUrl
      });
      //extract id from video table
      let videoOutput = await knex('video').select().where("video_room_pw",password);
      console.log('from server/videoCreateRoom videoOutput id',videoOutput);
  
      //extract id from workspace table
      let workspaceOutput = await knex('workspace').select().where("workspace_name",currentWorkspace)
      console.log('from server/videoCreateRoom wsOutput id',workspaceOutput);
      
      //extract id from users table
      let usersOutput = await knex('users').select().where("username",userName)
      console.log('from server/videoCreateRoom usersOutput id', usersOutput);

      //insert to video_workspace table 
      await knex('video_workspace').insert({
        video_id: videoOutput[0].id,
        workspace_id: workspaceOutput[0].id,
        user_id: usersOutput[0].id
      });
  
      res.json({
        message: 'server received video creator data',
      })
    }else{
      res.json({
        message: 'room name is empty'
      })
    }
    }catch(e){
      console.error(e.message)
    }
  
}


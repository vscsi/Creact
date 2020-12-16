const knex = require("../models/knex");
const cryptoRandomString = require('crypto-random-string');

exports.getVideoConferenceRoom = async(req,res)=>{
  const userId = req.userId;

  try{
    //sending bakc pw and room name
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
   //delete record from database
   
}


exports.postVideoCreateRoom = async(req,res) =>{
  const {userName, currentWorkspace, customRoomName} = req.body;
  const password = cryptoRandomString({length: 10});
  const room = cryptoRandomString({length: 10});
  const videoUrl = `https://meet.jit.si/${room}`

  try{
      if(customRoomName!==''&& password!==''&&room!==''){
        console.log('from server/videoCreateRoom',room, userName, currentWorkspace, password, customRoomName, videoUrl)
         await knex('video').insert({
           video_room_pw: password,
           video_room_name: customRoomName,
           video_hashed_room_name: room,
           video_room_url: videoUrl
         });
         //extract id from video table
         let videoOutput = await knex('video').select().where("video_room_pw",password);
        //  console.log('from server/videoCreateRoom videoOutput id',videoOutput);
     
         //extract id from workspace table
         let workspaceOutput = await knex('workspace').select().where("workspace_name",currentWorkspace)
        //  console.log('from server/videoCreateRoom wsOutput id',workspaceOutput);
         
         //extract id from users table
         let usersOutput = await knex('users').select().where("username",userName)
        //  console.log('from server/videoCreateRoom usersOutput id', usersOutput);
   
         //insert to video_workspace table 
         await knex('video_workspace').insert({
           video_id: videoOutput[0].id,
           workspace_id: workspaceOutput[0].id,
           user_id: usersOutput[0].id
         });
     
         res.json({
           message: 'server received video creator data',
           password: password,
           room: room
         })
      
      }else{
        res.json({
          message: 'room is empty'
        })
      }

      //returning current video rooms 


    }catch(e){
      console.error(e.message)
    }
  
}


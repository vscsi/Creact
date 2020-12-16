const knex = require("../models/knex");

exports.postVideoShowRoom = async(req,res)=>{
  const {currentWorkspace} = req.body;
  try{
    //get users from same workspace , more than 1 user in ws?
    let getCurrentWorkspace = await knex('workspace').select().where('workspace_name', currentWorkspace);
    console.log(getCurrentWorkspace,'this is getCurrentWorkspace')
    let getVideoIdFromSameWorkspace ;
    let getVideoInfoFromSameWorkspace ;
    let getVideoInfoFromSameWorkspaceArr = [];

    for (let item of getCurrentWorkspace){
      getVideoIdFromSameWorkspace = await knex('video_workspace').select().where('workspace_id', item.id);
      console.log(getVideoIdFromSameWorkspace, 'this is getVideoIdFromSameWorkspace')
    }
    for (let item of getVideoIdFromSameWorkspace){
      getVideoInfoFromSameWorkspace = await knex('video').select().where('id', item.video_id);
      getVideoInfoFromSameWorkspaceArr.push(getVideoInfoFromSameWorkspace[0]);
    }
    console.log(getVideoInfoFromSameWorkspaceArr, 'this is getVideoInfoFromSameWorkspaceArr')

    
  res.json({
    videoRooms: getVideoInfoFromSameWorkspaceArr,
  })
}catch(e){
    console.error(e.message);
}
}


const knex = require("../../models/knex");
let Buffer = require("buffer/").Buffer;
const users = [];

let existed = false


const addUser=({id, name, room})=> {
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();

                    //.find iterate throught users and find user base on condition
    const exitingUser = users.find(user=>user.room===room && user.name===name);
    
    if (exitingUser) {
        console.log('if exiting user',exitingUser)
        let index = users.findIndex((user)=> user.name ===exitingUser.name && user.room===exitingUser.room)
        console.log ('indexOf exiting User', index)
        users.splice(index, 1); 
        console.log('exiting user spliceed')
        existed = true
    }

    //user object consist of an object the consist of all info
    const user= {id, name, room};

    users.push(user);
   
    return { user, exist: existed }
};


const removeUser=(id)=>{
    const index = users.findIndex((user)=> user.id ===id);
    console.log('user remove triggered')
    if (index !== -1) {
        //[0] is calling the item from the array that splice create
        return users.splice(index, 1)[0];
    }

};

const getUser=(id)=> users.find((user)=> user.id === id);


const getUsersInRoom = (room) => users.filter((user)=> user.room === room);


const findUserName = async (userid, cb ) => {
    console.log('FinduserName and img')
    let query = await knex.select('first_name', 'img').where('id', userid)
    .from('users')
    console.log('query =', query )
    const buffer = Buffer.from(query[0].img);
    const base64 = buffer.toString();
    
    const result = {name: query[0]["first_name"], imgurl: base64 }
    // console.log('result', result)
    // return result;
    cb (result)
}



const findAdminId = async (cb) => {
    
    let query = await knex.select('id', 'img').where('first_name', 'Admin').from('users')
    // console.log('admin query',query)
    // console.log("admin id Found", typeof query[0].id);
    const result = {id:query[0].id, imgurl: query[0].img}
    cb(result)   
}




const getServerTime = async (cb) => {
    console.log('getServerTime triggered')
    let time = await knex.raw("SELECT CURRENT_TIMESTAMP")

        const currentTimestamp = time.rows[0].current_timestamp;

        cb (currentTimestamp)
} 

const writeToDatabase = async(roomId, userId, image, msg, cb) => {
    knex('chatmessage').insert({
        chatmessage_content: msg,
        user_id: userId,
        chatroom_id: roomId,
        imgurl: image
    }).then(()=> console.log('chatroomdatabase.js chatmessage inserted'))
}   

const getChatHistory = async (roomId, cb) => {
    
        let query = await knex.select('chatmessage_content', 'created_at', 'users.first_name', 'imgurl')
                .where('chatroom_id', roomId )
                .from ('chatmessage')
                .join('users', 'chatmessage.user_id', '=', "users.id")
                .orderBy('created_at')

                
                // let timestamp = (query[0].created_at)
                // console.log(timestamp.toLocaleString())
                 cb (query)       
                 
                 
}




module.exports = {addUser, removeUser, getUser, getUsersInRoom, findUserName, findAdminId, getChatHistory, getServerTime, writeToDatabase};
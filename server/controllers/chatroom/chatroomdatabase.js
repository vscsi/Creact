
const knex = require("../../models/knex");

const users = [];


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
        // return {error: "Username is taken"};
    }

    //user object consist of an object the consist of all info
    const user= {id, name, room};

    users.push(user);

    return { user }
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
    console.log('FinduserName triggered')
    let query = await knex.select('first_name').where('id', userid)
    .from('users')
    
    // console.log(query);
    const result = query[0]["first_name"];
    
    // return result;
    cb (result)
}

const findAdminId = async (cb) => {
    console.log("findadminId triggered")
    let query = await knex.select('id').where('first_name', 'Admin').from('users')

    console.log("admin id Found", typeof query[0].id);
    cb(query[0].id)   
}


const getServerTime = async (cb) => {
    console.log('getServerTime triggered')
    let time = await knex.raw("SELECT CURRENT_TIMESTAMP")

        const currentTimestamp = time.rows[0].current_timestamp;

        cb (currentTimestamp)
} 

const writeToDatabase = async(roomId, userId, msg, cb) => {
    knex('chatmessage').insert({
        chatmessage_content: msg,
        user_id: userId,
        chatroom_id: roomId
    }).then(()=> console.log('chatroomdatabase.js chatmessage inserted'))
}   

const getChatHistory = async (roomId, cb) => {
    console.log('getChatHistory triggered')
        let query = await knex.select('chatmessage_content', 'created_at', 'users.first_name')
                .where('chatroom_id', roomId )
                .from ('chatmessage')
                .join('users', 'chatmessage.user_id', '=', "users.id")
                .orderBy('created_at')
                // let timestamp = (query[0].created_at)
                // console.log(timestamp.toLocaleString())
                 cb (query)
    
    
                
}




module.exports = {addUser, removeUser, getUser, getUsersInRoom, findUserName, findAdminId, getChatHistory, getServerTime, writeToDatabase};
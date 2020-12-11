const knex = require("../../models/knex");

const users = [];


const addUser=({id, name, room})=> {
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();

                    //.find iterate throught users and find user base on condition
    const exitingUser = users.find(user=>user.room===room && user.name===name);

    // if (exitingUser) {
    //     return {error: "Username is taken"};
    // }

    //user object consist of an object the consist of all info
    const user= {id, name, room};

    users.push(user);

    return { user }
};


const removeUser=(id)=>{
    const index = users.findIndex((user)=> user.id ===id);

    if (index !== -1) {
        //[0] is calling the item from the array that splice create
        return users.splice(index, 1)[0];
    }

};

const getUser=(id)=> users.find((user)=> user.id === id);


const getUsersInRoom = (room) => users.filter((user)=> user.room === room);


const findUserName = async (userid, cb ) => {
    let query = await knex.select('first_name').where('id', userid)
    .from('users')
    
    // console.log(query);
    const result = query[0]["first_name"];
    
    // return result;
    cb (result)
}

const getServerTime = async (cb) => {
    let time = await knex.raw("SELECT CURRENT_TIMESTAMP")

        const currentTimestamp = time.rows[0].current_timestamp;

        cb (currentTimestamp)
} 


const getChatHistory = async (roomId, cb) => {
    console.log('database roomId',  roomId)
    let query = await knex.select('chatmessage_content', 'created_at', 'users.first_name')
                .where('chatroom_id', roomId )
                .from ('chatmessage')
                .join('users', 'chatmessage.user_id', '=', "users.id")
                .orderBy('created_at')
                // let timestamp = (query[0].created_at)
                // console.log(timestamp.toLocaleString())
                 cb (query)
                
}




module.exports = {addUser, removeUser, getUser, getUsersInRoom, findUserName, getChatHistory, getServerTime};
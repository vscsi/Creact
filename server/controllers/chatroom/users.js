const users = [];


const addUser=({id, name, room})=> {
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();

                    //.find iterate throught users and find user base on condition
    const exitingUser = users.find(user=>user.room===room && user.name===name);

    if (exitingUser) {
        return {error: "Username is taken"};
    }

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

module.exports = {addUser, removeUser, getUser, getUsersInRoom};
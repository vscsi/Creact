const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');



module.exports = function (io) {

    io.on('connect', (socket)=> {
        console.log('client side have connected');
    
        socket.on('join', ({name, room}, callback)=> {
            const {error, user} = addUser({id: socket.id, name, room});
    
            if(error) {
                return console.log(error);
            } 
    
            socket.emit('message', {user: 'admin', text: `${user.name}, welcome to ${user.room} `});
            
            socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name}, has joined! `})
    
            socket.join(user.room);
    
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    
            callback;
           
        })
    
        socket.on('sendMessage', (message, callback) => {
            const user = getUser(socket.id);
    
            io.to(user.room).emit('message', {user: user.name, text: message})
    
            callback();
    
        })
    
        socket.on('disconnect', ()=> {
            const user = removeUser(socket.id);
    
            if (user) {
                io.to(user.room).emit('message', {user: "admin", text: `${user.name} has left`})
                io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
            }
    
        })
    })
}
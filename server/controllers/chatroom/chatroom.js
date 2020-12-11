const {addUser, removeUser, getUser, getUsersInRoom, findUserName, getChatHistory, getServerTime} = require('./chatroomdatabase');



module.exports = function (io) {

    io.sockets.on('connect', (socket)=> {
        console.log('client side have connected with socketid :' + socket.id);
        
        io.to(socket.id).emit('onConnect', {
            socket_id: socket.id
        });

        
        socket.on('join', ({userid, room}, callback)=> {
            
             findUserName(userid, (result)=> {
                 let userName = result;
                //  console.log('chatroomjs', room)
            const {error, user} = addUser({id: socket.id, name: userName, room: room});
                
            if(error) {
                return console.log(error);
            } 

            socket.emit('message', {userName: 'admin', message: `${userName}, welcome to room ${room} !`, timestamp: "now", userImage:'https://storage.cloud.google.com/imagetest_1/Untitled-Artwork.png'});
            
            socket.broadcast.to(user.room).emit('message', {userName:'admin', message: `${userName}, has joined! `, timestamp: 'now', userImage: 'https://storage.cloud.google.com/imagetest_1/Untitled-Artwork.png'})
    
            socket.join(user.room);

            })
            
    
           
    
            callback;
           
        })

        socket.on('chatHistory', (roomId) => {
            console.log("chatroom.js", roomId)
             getChatHistory(roomId, (data) => {
                io.to(roomId).emit('returnHistory', {rows: data})
               
            })
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
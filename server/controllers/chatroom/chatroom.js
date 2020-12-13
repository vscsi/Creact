const {addUser, removeUser, getUser, getUsersInRoom, findUserName, getChatHistory, getServerTime, writeToDatabase} = require('./chatroomdatabase');



module.exports = function (io) {
    
    io.sockets.on('connect', (socket)=> {
        console.log('client side have connected with socketid :' + socket.id);
        let socketId = socket.id;
        io.to(socket.id).emit('onConnect', {
            socket_id: socket.id
        });

        
        socket.on('join', ({userid, room}, callback)=> {
             console.log('join triggered')
             findUserName(userid, (result)=> {
                 let userName = result;
                //  console.log('chatroomjs', room)
            const {error, user} = addUser({id: socket.id, name: userName, room: room});
                
            if(error) {
                return console.log(error);
            } 

            let welcomeMsg = [{userName: 'admin', message: `${userName}, welcome to room ${room} !`, timestamp: "now", userImage:'https://storage.cloud.google.com/imagetest_1/Untitled-Artwork.png'}];

            let joinedMsg = [{userName:'admin', message: `${userName}, has joined! `, timestamp: 'now', userImage: 'https://storage.cloud.google.com/imagetest_1/Untitled-Artwork.png'}];

            socket.emit('adminMessage', {data: welcomeMsg});
            
            
            socket.broadcast.to(user.room).emit('adminMessage', {data: joinedMsg})
    
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
            getServerTime((time)=> {
                let readableTime = time.toLocaleString();
                
                console.log(message)
                writeToDatabase(message.roomId, message.userId, message.message)

                // io.to(user.room).emit('message', {userName: user.name, message: message, timestamp: readableTime, userImage: 'https://picsum.photos/200'})
                console.log(user.room)
                io.to(user.room).emit('eachMessage')
            })
            
    
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
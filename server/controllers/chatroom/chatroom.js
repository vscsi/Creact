const {addUser, removeUser, getUser, getUsersInRoom, findUserName, findAdminId, getChatHistory, getServerTime, writeToDatabase} = require('./chatroomdatabase');



module.exports = function (io) {
    
    io.sockets.on('connect', (socket)=> {
        console.log('client side have connected with socketid :' + socket.id);
        
        io.to(socket.id).emit('onConnect', {
            socket_id: socket.id
        });

        
        socket.on('join', ({userid, room}, callback)=> {
             console.log('join triggered')
             findUserName(userid, (result)=> {
                 let userName = result;
                //  console.log('chatroomjs', room)
            const {error, user} = addUser({id: socket.id, name: userName, room: room});
                console.log('user object get', error, user)
            if(error) {
                return console.log(error);
            } 

            let welcomeMsg = [{userName: 'admin', message: `${userName}, welcome to room ${room} !`, timestamp: "now", userImage:'https://storage.cloud.google.com/imagetest_1/Untitled-Artwork.png'}];

            let joinedMsg = [{userName:'admin', message: `${userName}, has joined! `, timestamp: 'now', userImage: 'https://storage.cloud.google.com/imagetest_1/Untitled-Artwork.png'}];
            findAdminId((adminId)=> {
                 writeToDatabase(room, adminId, `${userName}, has joined! `)
            })
            
               

                // io.to(user.room).emit('message', {userName: user.name, message: message, timestamp: readableTime, userImage: 'https://picsum.photos/200'})
                
                io.to(room).emit('eachMessage', user )
            

            
            let usersInRoom = getUsersInRoom(user.room);
            console.log('users get from array',  usersInRoom);
            
            socket.join(user.room);
            
            
            
            io.to(user.room).emit('usersInRoom', {usersInRoom: usersInRoom})
            })
        
            callback;
           
        })
        
     


        socket.on('chatHistory', (roomId) => {
            if(roomId){
                 getChatHistory(roomId, (data) => {
                     
                io.to(roomId).emit('returnHistory', {rows: data})
               
            })
            }
            
        })


    
        socket.on('sendMessage', (message,  callback) => {
            const user = getUser(socket.id);
            console.log( 'after getUser', user);
            console.log(message)
                writeToDatabase(message.roomId, message.userId, message.message)

                // io.to(user.room).emit('message', {userName: user.name, message: message, timestamp: readableTime, userImage: 'https://picsum.photos/200'})
                
                io.to(message.roomId).emit('eachMessage', user )
            
            
            // getServerTime((time)=> {
            //     let readableTime = time.toLocaleString();
                
                
            // })
            
    
            callback();
    
        })


        
    
        socket.on('disconnect', (data)=> {
            const user = removeUser(data.socket_id);
           
            if (user) {
                io.to(user.room).emit('message', {user: "admin", text: `${user.name} has left`})
                io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
            }
    
        })
    })
}
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  findUserName,
  findAdminId,
  getChatHistory,
  getServerTime,
  writeToDatabase,
} = require("./chatroomdatabase");



module.exports = function (io) {
    
    io.sockets.on('connect', (socket)=> {
        console.log('client side have connected to chatroom server with socketid :' + socket.id);
        
        io.to(socket.id).emit('onConnect', {
            socket_id: socket.id
        });
        let USER= [];
        let ROOM= [];
        let ID=[];

        
        socket.on('join', ({userid, room}, callback)=> {
             console.log('join triggered')
             findUserName(userid, (result)=> {
                 let userName = result;
                //  console.log('chatroomjs', room)
            const {exist, user} = addUser({id: socket.id, name: userName, room: room});
                console.log('user object get', exist, user)
            if(exist) {
                 console.log(exist);
            } 
            USER.push(userName);
            ROOM.push(room);
            ID.push(socket.id)
            
            let welcomeMsg = [{userName: 'admin', message: `${userName}, welcome to room ${room} !`, timestamp: "now", userImage:'https://storage.cloud.google.com/imagetest_1/Untitled-Artwork.png'}];

            let joinedMsg = [{userName:'admin', message: `${userName}, has joined! `, timestamp: 'now', userImage: 'https://storage.cloud.google.com/imagetest_1/Untitled-Artwork.png'}];
            if (!exist) {
                findAdminId((adminId)=> {
                 writeToDatabase(room, adminId, `${userName}, has joined! `)
            })
            }
            

                // io.to(user.room).emit('message', {userName: user.name, message: message, timestamp: readableTime, userImage: 'https://picsum.photos/200'})
                
                io.to(room).emit('eachMessage', user )
            

            
            let usersInRoom = getUsersInRoom(user.room);
            // console.log('users get from array',  usersInRoom);
            
            socket.join(user.room);
            
            
            
            io.to(user.room).emit('usersInRoom', {usersInRoom: usersInRoom})
            })
        
            callback;
           
        })
        
     


        socket.on('chatHistory', (roomId) => {
            if(roomId){
                 getChatHistory(roomId, (data) => {
                     
                io.to(roomId).emit('returnHistory', {rows: data})
                // console.log('chattHistory emmited')
               
            })
            }
            
        })


    
        socket.on('sendMessage', (message,  callback) => {
            const user = getUser(socket.id);
            // console.log( 'after getUser', user);
            // console.log(message)
                writeToDatabase(message.roomId, message.userId, message.message)

                // io.to(user.room).emit('message', {userName: user.name, message: message, timestamp: readableTime, userImage: 'https://picsum.photos/200'})
                
                io.to(message.roomId).emit('eachMessage', user )
                // console.log('eachMessage emitted')
            
            // getServerTime((time)=> {
            //     let readableTime = time.toLocaleString();
                
                
            // })
            
    
            callback();
    
        })
        socket.on('removeUser', ()=> {
           
            console.log('disconnect triggered')
            const user = removeUser(ID[0]);
            findAdminId((adminId)=> {
                writeToDatabase(ROOM[0], adminId, `${USER[0]}, has left. `)
           })
            console.log(user)
           
            if (user) {
                io.to(user.room).emit('message', {user: "admin", text: `${user.name} has left`})
                
            }
        })

        
    
        // socket.on('disconnect', (data)=> {
        //     console.log(USER[0]);
        //     console.log('disconnect triggered')
        //     const user = removeUser(ID[0]);
        //     findAdminId((adminId)=> {
        //         writeToDatabase(ROOM[0], adminId, `${USER[0]}, has left. `)
        //    })
        //     console.log(user)
           
        //     if (user) {
        //         io.to(user.room).emit('message', {user: "admin", text: `${user.name} has left`})
                
        //     }
    
        // })
    })
}

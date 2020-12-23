let workspace = '';

const rooms = [];

const addRoom = (id, roomname)=> {
    console.log('roomname',typeof roomname)
    roomname=roomname.trim().toLowerCase();
    const exitingroomname = rooms.find(room=>rooms.roomname===roomname);
    if(exitingroomname) {
        console.log("room repeated")
    }

    const room = {id, roomname};

    rooms.push(room)
    console.log('room pushed')
    console.log('now the rooms looks like', rooms)
    return {room}
}

const getroombyId = (id)=> {
    console.log('id', id)
    let getroom = rooms.find(room=> room.id ===id);
    console.log("getroombyId",getroom)
    return getroom.roomname
}



module.exports = function(io) {
    io.sockets.on('connect', (socket)=> {
        console.log('A client has connect to canvas server with socketid : ', socket.id);
        const id = socket.id

        socket.on('join', (data)=> {
            
            socket.join(data.workspaceName)
            workspace = data.workspaceName
           
            addRoom(id, workspace);
        })


        socket.on('sendDrawing', (data)=> {
           let room = getroombyId(data.id);
            console.log('senddrawing room', room)
            socket.broadcast.to(room).emit('severtoClientDrawing', data)
        })

        socket.on('disconnect', ()=> {
            console.log('Canvas client disconnected')
        })
    })



}
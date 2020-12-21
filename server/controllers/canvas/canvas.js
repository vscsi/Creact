let workspace = '';


module.exports = function(io) {
    io.sockets.on('connect', (socket)=> {
        console.log('A client has connect to canvas server with socketid : ', socket.id);

        socket.on('join', (data)=> {
            
            socket.join(data.workspaceName)
            workspace = data.workspaceName
        })


        socket.on('sendDrawing', (data)=> {
            console.log('got sendDrawing, brilliant Charles');
            socket.broadcast.to(workspace).emit('severtoClientDrawing', data)
        })

        socket.on('disconnect', ()=> {
            console.log('Canvas client disconnected')
        })
    })



}
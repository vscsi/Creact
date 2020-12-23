let workspace = '';
let typedata = null


module.exports = function (io) {
    io.sockets.on ('connect', (socket)=> {
        console.log('A client has connect to colldoc server with socketid : ', socket.id);
        socket.on('join', (data)=> {
            socket.join(data.workspaceName)
            workspace = data.workspaceName   
            
            

        })


        socket.on('saveCardFromClient', (data)=> {
            console.log('got doc save card, amazing Charles')    
            typedata = data;
            
            socket.broadcast.to(workspace).emit('servertoClientSaveCard', data)

            
        })

        socket.on('disconnect', ()=> {
            console.log('Colldoc client disconnected')
        })

    })
}
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')

const PORT = process.env.PORT || 4000;


//socket set up
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const socketio = socket(server);

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "client/build")))


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
}

//routers
const taskRoutes = require('./routes/task');
const registerRoutes = require('./routes/register');

//task
app.use(taskRoutes);
app.use(registerRoutes);

//Video
const videoIo = require('./controllers/video')(socketio)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

server.listen(PORT, ()=>{
    console.log(`Creact server, Listening to port ${PORT}`);
})
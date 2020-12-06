const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");

//socket set up
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const socketio = socket(server);

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt()); //use jtw auth to secure the api

//routers
const taskRoutes = require("./routes/task");

//global error handler
app.use(errorHandler);
//task
app.use(taskRoutes);
//api routes
app.use("/users", require("./users/users.controller"));

//Video
const videoIo = require("./controllers/video")(socketio);

server.listen(4000, () => {
  console.log("Creact server, Listening to port 4000");
});

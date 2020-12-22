const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");
const knex = require("./models/knex");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const config = require("./config.json");
const bcrypt = require("bcrypt");
const multer  = require('multer')
const upload = multer();
// const expressJwt = require("express-jwt");
const { verifyJWT } = require("./_helpers/jwt-handler");


//socket set up
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const socketio = socket(server);
const chatio = socket(server, {
  path:'/chatroom'
})
const canvasio = socket(server, {
  path:'/canvas'
})
const colldocio = socket(server, {
  path:'/colldoc'
})


//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(bodyParser.urlencoded({ extended: true }));

//routers
const taskRoutes = require("./routes/task");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const workspaceRoutes = require("./routes/workspace");
const userRoutes = require("./routes/user");
const videoCreateRoomRoutes = require("./routes/videoCreateRoom");
const videoShowRoomRoutes = require('./routes/videoShowRoom')
const docRoutes = require('./routes/docs')

//jwt
// app.use(
//   expressJwt({
//     secret: config.secret,
//   }).unless({
//     path: ["/login", "/register"],
//   })
// );

//global error handler
app.use(errorHandler);

//task
app.use(taskRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(workspaceRoutes);
app.use(userRoutes);
app.use(videoCreateRoomRoutes);
app.use(videoShowRoomRoutes);
app.use(docRoutes);
//api routes

//Auth stuff
app.get("/isUserAuth", verifyJWT, (req, res) => {
  //if after decoding the JWT, found the userID is existed in db, then is authenticated
  console.log("Getting From /isUserAuth");
  console.log(req.userId);
  console.log(req.userName);
  res.json({
    message: "Yo u are authenticated",
    userId: req.userId,
  });
  // res.send("yo you are authenticated")
});

//docs
// app.use(docsRoutes);

//Video
// const videoIo = require("./controllers/video")(socketio);
//Chat
const chatroom = require("./controllers/chatroom/chatroom")(chatio);
const canvas = require("./controllers/canvas/canvas")(canvasio);
const colldoc = require("./controllers/colldoc/colldoc")(colldocio);

server.listen(4000, () => {
  console.log("Creact server, Listening to port 4000");
});

const express = require("express");
const app = express();
const path = require('path')
const bodyParser = require("body-parser");
const cors = require("cors");
// const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");
const knex = require("./models/knex");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const config = require("./config.json");
const bcrypt = require("bcrypt");
// const expressJwt = require("express-jwt");
const { verifyJWT } = require("./_helpers/jwt-handler");



//socket set up
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const socketio = socket(server);

//middleware
app.use(cors({ origin: true }));
app.use(express.json()); //req.body
app.use(bodyParser.urlencoded({ extended: true }));

//cors setup
app.use((req, res, next) => {
  res.header('Acces-Control-Allow-Origin', 'https://creact-app.com');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

//routers
const taskRoutes = require("./routes/task");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const workspaceRoutes = require("./routes/workspace");
const userRoutes = require("./routes/user");

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
});

//Video
const videoIo = require("./controllers/video")(socketio);

// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname + '/client/build/index.html'))

// })

server.listen(4000, () => {
  console.log("Creact server, Listening to port 4000");
});

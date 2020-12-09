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

//socket set up
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const socketio = socket(server);

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(jwt()); //use jtw auth to secure the api

//routers
const taskRoutes = require("./routes/task");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const workspaceRoutes = require("./routes/workspace");

//global error handler
app.use(errorHandler);
//task
app.use(taskRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(workspaceRoutes);

//api routes

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("Yo we need a token, please give it to us next time!");
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U failed to authenticated" });
      } else {
        //get user info using decoded
        console.log("JWT token should be correct");
        console.log("Decoding...");
        console.log("Decoded is below");
        console.log(decoded);
        req.userId = decoded.id;
        req.userName = decoded.name;
        next();
      }
    });
  }
};

//Auth stuff
app.get("/isUserAuth", verifyJWT, (req, res) => {
  //if after decoding the JWT, found the userID is existed in db, then is authenticated
  console.log(req.userId);
  console.log(req.userName);
  res.json({
    message: "Yo u are authenticated",
    userId: req.userId,
  });
});

//Video
const videoIo = require("./controllers/video")(socketio);

server.listen(4000, () => {
  console.log("Creact server, Listening to port 4000");
});

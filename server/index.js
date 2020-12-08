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

//global error handler
app.use(errorHandler);
//task
app.use(taskRoutes);

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
        req.userId = decoded.sub;
        next();
      }
    });
  }
};

//Auth stuff
app.get("/isUserAuth", verifyJWT, (req, res) => {
  //if after decoding the JWT, found the userID is existed in db, then is authenticated
  console.log(req.userId);
  res.json({ message: "Yo u are authenticated", userId: req.userId });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    const user = await knex("users")
      .where({ username: username, user_pw: password })
      .select("id", "username", "user_pw");
    console.log(user);
    if (user.length === 0) throw "Username or password is incorrect";

    //create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user[0].id }, config.secret, {
      expiresIn: "7d",
    });
    // req.session.user = user;
    res.json({ auth: true, accessToken: token, result: user });
  } catch (error) {
    res.json({ auth: false, message: "User doesnt exist" });
  }
});

//Video
const videoIo = require("./controllers/video")(socketio);

server.listen(4000, () => {
  console.log("Creact server, Listening to port 4000");
});

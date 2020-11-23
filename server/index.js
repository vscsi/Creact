const express = require('express');
const app = express();
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//




app.listen(4000, ()=>{
    console.log("Creact server, Listening to port 4000");
})
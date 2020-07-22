const port = require('./config/config');

const express = require('express');
const app = express();
const { mongoose } = require('./database');


//middlewares

app.use(express.json());


//global route
app.use(require('./routes/index-route'));


//Listening

app.listen(process.env.PORT, (req, res) => {

    console.log(`---Server on port ${process.env.PORT}!!!---`);
});
const port = require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const { mongoose } = require('./database');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())


//middlewares

app.use(express.json());


//global route
app.use(require('./routes/index-route'));

//static file

app.use(express.static(path.join(__dirname, 'public')));

//Listening

app.listen(process.env.PORT, (req, res) => {

    console.log(`---Server on port ${process.env.PORT}!!!---`);
});
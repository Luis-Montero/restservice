const port = require('./config/config');

const express = require('express');
const app = express();
const { mongoose } = require('./database');


//middlewares

app.use(express.json());




//router
app.use('/coffe/user', require('./routes/usuario'));



//Listening

app.listen(port, () => {

    console.log(`Server on port ${port}`);
});
const mongoose = require('mongoose');


const URI = process.env.URLDB;

mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true })
    .then(db => console.log('--------->database connected<------------'))
    .catch(err => console.error(err));



module.exports = mongoose;
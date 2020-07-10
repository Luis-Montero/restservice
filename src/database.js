const mongoose = require('mongoose');


const URI = 'mongodb://localhost/cafe';

mongoose.connect(URI)
    .then(db => console.log('--------->database connected<------------'))
    .catch(err => console.error(err));



module.exports = mongoose;
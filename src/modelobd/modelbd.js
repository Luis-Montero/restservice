const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
//const { delete } = require('../routes/usuario');

const UsersSchema = new Schema({

    name: { type: String, required: [true, 'name is required'] },
    email: { type: String, unique: true, required: [true, 'email is required'] },
    password: { type: String, required: [true, 'password is required'] },
    img: { type: String, required: false },
    status: { type: Boolean, default: true },
    google: { type: Boolean, default: false }

});

UsersSchema.methods.toJSON = function() {

    let users = this;
    let userObject = users.toObject();
    delete userObject.password;

    return userObject;
}


UsersSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('User', UsersSchema);
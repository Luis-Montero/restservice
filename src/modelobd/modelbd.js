const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({

    name: { type: String, required: [true, 'name is required'] },
    email: { type: String, required: [true, 'email is required'] },
    password: { type: String, required: [true, 'password is required'] },
    img: { type: String, required: false },
    role: { type: String, default: 'USER_ROLE' },
    status: { type: Boolean, default: true },
    google: { type: Boolean, default: false }

});

module.exports = mongoose.model('Usuario', UsersSchema);
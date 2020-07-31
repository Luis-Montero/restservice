const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({

    description: { type: String, unique: true, required: [true, 'description is required'] },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Category', categorySchema);
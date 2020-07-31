const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    description: { type: String, required: false },
    name: { type: String, required: [true, 'name is required'] },
    uniPrice: { type: Number, required: [true, 'unit Price is required'] },
    available: { type: Boolean, required: true, default: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }

});

module.exports = mongoose.model('Product', productSchema);
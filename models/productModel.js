const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: String,
    price: Number,
    category: String,
    onSale: Boolean,
    quantity: Number,
    image: String,
    stock: Number,

})

module.exports = mongoose.model('admin', productSchema);
const mongoose = require('mongoose');
const { array } = require('prop-types');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    email: String,
    name: String,
    lastName: String,
    address: String,
    postCode: String,
    city: String,
    country: String,
    OrderProdQuantity: Array
})

module.exports = mongoose.model('order', orderSchema);
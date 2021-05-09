const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    password: String,
    isAdmin: Boolean,

})
module.exports = mongoose.model('product', userSchema);


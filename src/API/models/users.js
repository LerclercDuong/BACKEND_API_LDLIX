const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
    _id: String,
    username: String,
    email: String,
    password: String,
})


module.exports = mongoose.model('users', users);
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    isOwner:Boolean
})

module.exports = mongoose.model('Users', UserSchema);

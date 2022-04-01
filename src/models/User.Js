const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        maxlength: 30
    },
    name: {
        type: String,
        maxlength: 70
    },
    password: {
        type: String,
        maxlength: 100,
    },
    email: {
        type: String,
        maxlength: 255
    },
    permission: {
        type: String,
        maxlength: 10
    }
})

module.exports = mongoose.model('User', UserSchema)

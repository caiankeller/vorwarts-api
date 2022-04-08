const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 32
  },
  name: {
    type: String,
    maxlength: 70
  },
  password: {
    type: String,
    maxlength: 100
  },
  email: {
    type: String,
    maxlength: 255
  }
})

module.exports = mongoose.model('User', UserSchema)

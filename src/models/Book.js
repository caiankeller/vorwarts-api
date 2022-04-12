const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100
  },
  author: {
    type: String,
    maxlength: 100
  },
  year: {
    type: Number,
    maxlength: 4
  },
  genres: {
    type: Array
  },
  country: {
    type: String,
    maxlength: 100
  },
  countryCode: {
    type: String,
    maxlength: 2
  },
  language: {
    type: String,
    maxlength: 100
  },
  files: [
    {
      type: {
        type: String,
        maxlength: 40
      },
      extension: {
        type: String,
        maxlength: 4
      },
      url: {
        type: String,
        maxlength: 255
      },
      language: {
        type: String,
        maxlength: 100
      }
    }
  ],
  cover: {
    highQuality: {
      type: String,
      maxlength: 100
    },
    lowQuality: {
      type: String,
      maxlength: 100
    }
  },
  user: {
    type: String,
    maxlength: 32
  }
})

module.exports = mongoose.model('Book', BookSchema)

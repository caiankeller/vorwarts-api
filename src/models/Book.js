const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 70
  },
  year: {
    // year of the first publishment
    type: Number,
    maxlength: 4
  },
  author: {
    type: String,
    maxlength: 40
  },
  genres: {
    type: Array
  },
  country: {
    // country original
    type: String
  },
  language: {
    type: String
  },
  cover: {
    type: Object,
    highQuality: {
      type: String,
      maxlength: 255
    },
    lowQuality: {
      type: String,
      maxlength: 255
    }
  },
  downloads: [
    {
      type: String,
      extension: String,
      url: String
    }
  ]
})

module.exports = mongoose.model('Book', BookSchema)

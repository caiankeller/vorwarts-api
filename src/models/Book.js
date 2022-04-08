const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: {
    original: {
      type: String
    },
    english: {
      type: String
    }
  },
  year: {
    type: Number
  },
  author: {
    type: String
  },
  genres: {
    type: Array
  },
  country: {
    type: String
  },
  countryCode: {
    type: String
  },
  language: {
    type: String
  },
  cover: {
    highQuality: {
      type: String
    },
    lowQuality: {
      type: String
    }
  },
  files: [
    {
      type: {
        type: String
      },
      extension: {
        type: String
      },
      url: {
        type: String
      },
      language: {
        type: String
      }
    }
  ]
})

module.exports = mongoose.model('Book', BookSchema)

const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 70,
  },
  firstPublishment: {
    type: Number,
    maxlength: 4,
  },
  author: {
    type: String,
    maxlength: 40,
  },
  genre: {
    type: Array,
  },
  originCountry: {
    type: String,
  },
  language: {
    type: String,
  },
  cover: {
    type: Object,
    highQuality: {
      type: String,
      maxlength: 255,
    },
    lowQuality: {
      type: String,
      maxlength: 255,
    },
  },
  color: {
    type: Number,
    maxlength: 6,
  },
  wikipedia: {
    type: String,
    maxlength: 255,
  },
  availableDownloads: [{ type: String, extension: String, url: String }],
});

module.exports = mongoose.model("Book", BookSchema);

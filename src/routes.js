const express = require('express')

const BookController = require('./controllers/BookController')

const routes = express.Router()

routes.get('/books', BookController.getBooks)
routes.get('/genres', BookController.getGenres)
routes.get('/countries', BookController.getCountries)

module.exports = routes

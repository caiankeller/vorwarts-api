const express = require('express')

const BookController = require('./controllers/BookController')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.get('/books', BookController.getBooks)
routes.get('/genres', BookController.getGenres)
routes.get('/countries', BookController.getCountries)

routes.post('/users', UserController.createUser)
routes.post('/login', UserController.authenticationUser)

module.exports = routes

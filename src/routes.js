const express = require('express')

const BookController = require('./controllers/BookController')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.get('/books', BookController.getBooks)
routes.get('/genres', BookController.getGenres)
routes.get('/countries', BookController.getCountries)

routes.post('/signup', UserController.createUser)
routes.use('/login', UserController.authenticationUser)

module.exports = routes

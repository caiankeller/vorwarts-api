const express = require('express')

const BookController = require('./controllers/BookController')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.get('/books', BookController.getBooks)
routes.post('/book', UserController.authorizationUser, BookController.postBook)
routes.get('/genres', BookController.getGenres)
routes.get('/countries', BookController.getCountries)

routes.post('/signup', UserController.createUser)
routes.get('/login', UserController.authenticationUser)
routes.get(
  '/token',
  UserController.authorizationUser,
  UserController.createToken
)

module.exports = routes

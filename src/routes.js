const express = require("express");

const BookController = require("./controllers/BookController");

const routes = express.Router();

routes.get("/books", BookController.getBooks);

module.exports = routes;
const express = require("express");

const BookController = require("./controllers/BookController");

const routes = express.Router();

routes.get("/getbooks", BookController.getBooks);

module.exports = routes;
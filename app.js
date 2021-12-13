const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.connect(
  "mongodb+srv://root:marianne@vorwarts.mewdj.mongodb.net/vorwarts?retryWrites=true&w=majority"
);

app.listen(5000, () => {});

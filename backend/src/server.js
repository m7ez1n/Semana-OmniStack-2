require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const databaseConfig = require("./config/database");
const routes = require("./routes");

const server = express();

mongoose.connect(databaseConfig.uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

server.use(express.json());
server.use(routes);

server.listen(3333);

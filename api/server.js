const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const booksRouter = require("../routers/booksRouter.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/books", booksRouter);

module.exports = server;

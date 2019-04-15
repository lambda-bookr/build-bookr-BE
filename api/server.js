const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const booksRouter = require("../routers/booksRouter.js");
const authRouter = require("../routers/authRouter.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/books", booksRouter);
server.use("/api/auth", authRouter);

module.exports = server;

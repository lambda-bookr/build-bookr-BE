const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const booksRouter = require("../routers/booksRouter.js");
const reviewsRouter = require("../routers/reviewsRouter.js");
const authRouter = require("../routers/authRouter.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/books", booksRouter, reviewsRouter);
server.use("/api/auth", authRouter);

module.exports = server;

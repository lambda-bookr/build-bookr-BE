const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const booksRouter = require("../routers/booksRouter.js");
const reviewsRouter = require("../routers/reviewsRouter.js");
const authRouter = require("../routers/authRouter.js");
const usersRouter = require("../routers/usersRouter.js");
const authorization = require("../routers/authorization.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/books", booksRouter);
server.use("/api/reviews", reviewsRouter);
server.use("/api/auth", authRouter);
server.use("/api/users", authorization, usersRouter);

module.exports = server;

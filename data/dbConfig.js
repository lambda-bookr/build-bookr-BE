const knex = require("knex");
const config = require("../knexfile.js");

const dbEnvironment = process.env.DB_ENVIRONMENT || "development";

module.exports = knex(config[dbEnvironment]);

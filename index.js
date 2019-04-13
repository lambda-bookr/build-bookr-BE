require("dotenv").config();
const server = require("./api/server.js");

const port = process.env.PORT || 4000;

server.listen(port, function() {
  console.log(`*** Server listening on port ${port}. ***`);
});

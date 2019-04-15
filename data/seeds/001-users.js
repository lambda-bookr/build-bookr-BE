const fs = require("fs");
const faker = require("faker");
const bcrypt = require("bcryptjs");
const fakeUsers = require("../dummyData/fakeUsers")["users"];

// const createFakeUser = () => ({
//   firstName: faker.name.firstName(),
//   lastName: faker.name.lastName(),
//   username: faker.internet.userName(),
//   password: faker.internet.password()
// }); used this to create fake users file in dummyData

exports.seed = function(knex, Promise) {
  // const fakeUsers = [];

  // for (let i = 0; i < 30; i++) {
  //   fakeUsers.push(createFakeUser());
  // }

  // fs.writeFileSync(
  //   "./data/dummyData/fakeUsers.json",
  //   JSON.stringify({ users: fakeUsers })
  // ); used this to create fake users file in dummyData

  fakeUsers.map(user => {
    user.password = bcrypt.hashSync(user.password, 8);
  });

  return knex("users").insert(fakeUsers);
};

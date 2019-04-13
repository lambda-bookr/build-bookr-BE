const fs = require("fs");
const faker = require("faker");
const fakeBooks = require("../dummyData/fakeBooks")["books"];

// const createFakeBook = () => ({
//   author: faker.name.findName(),
//   name: faker.commerce.productName(),
//   price: faker.commerce.price(),
//   publisher: faker.company.companyName(),
//   description: faker.lorem.paragraph(),
//   imageUrl: faker.image.imageUrl()
// });  used this to create fake books file in dummyData

exports.seed = function(knex, Promise) {
  // const fakeBooks = [];

  // for (let i = 1; i <= 30; i++) {
  //   const fakeBook = createFakeBook();
  //   fakeBook.user_id = i;
  //   fakeBooks.push(fakeBook);
  // }

  // fs.writeFileSync(
  //   "./data/dummyData/fakeBooks.json",
  //   JSON.stringify({ books: fakeBooks })
  // ); used this to create fake books array

  return knex("books").insert(fakeBooks);
};

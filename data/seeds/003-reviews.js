const fs = require("fs");
const faker = require("faker");
const fakeReviews = require("../dummyData/fakeReviews")["reviews"];

// const createFakeReview = () => ({
//   review: faker.lorem.paragraph()
// });  used this to create fake reviews file in dummyData

exports.seed = function(knex, Promise) {
  // const fakeReviews = [];

  // for (let i = 1; i <= 90; i++) {
  //   const fakeReview = createFakeReview();
  //   fakeReview.rating = Math.ceil(Math.random() * 5);
  //   fakeReview.book_id = Math.ceil(Math.random() * 30);
  //   fakeReview.user_id = Math.ceil(Math.random() * 30);
  //   fakeReviews.push(fakeReview);
  // }

  // fs.writeFileSync(
  //   "./data/dummyData/fakeReviews.json",
  //   JSON.stringify({ reviews: fakeReviews })
  // ); used this to create fake reviews array

  return knex("reviews").insert(fakeReviews);
};

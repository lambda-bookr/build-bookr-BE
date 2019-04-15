const db = require("../dbConfig.js");

module.exports = {
  find,
  findById,
  create,
  remove,
  update
};

async function find() {
  const books = await db("books");
  return books;
}

async function findById(id) {
  let bookContent = db("books")
    .select({
      id: "books.id",
      user_id: "books.user_id",
      imageUrl: "books.imageUrl",
      author: "books.author",
      name: "books.name",
      price: "books.price",
      publisher: "books.publisher",
      description: "books.description",
      username: "users.username",
      firstName: "users.firstName",
      lastName: "users.lastName",
      thumbnailUrl: "users.thumbnailUrl"
    })
    .innerJoin("users", "books.user_id", "users.id")
    .where({ "books.id": id })
    .first();
  let bookReviews = db("reviews")
    .select({
      id: "reviews.id",
      review: "reviews.review",
      rating: "reviews.rating",
      username: "users.username",
      thumbnailUrl: "users.thumbnailUrl"
    })
    .innerJoin("users", "reviews.user_id", "users.id")
    .where({ "reviews.book_id": id });
  let rating = db("reviews")
    .avg({ rating: "rating" })
    .where({ book_id: id });
  const retrieval = await Promise.all([bookContent, bookReviews, rating]);
  if (retrieval[0]) {
    /* This is only true if both the promise resolved AND the post exists. Checking for just the promise causes
    nonexistent posts to return an empty object and array due to my return statement returning an object by default */
    let content = retrieval[0];
    let reviews = retrieval[1];
    let [rating] = retrieval[2]; // Each review has an avgRating on it, I am just grabbing the avgRating from the first review
    return { ...content, rating: rating.rating, reviews };
  }
}

// let bookReviews = db.raw(
//   `select reviews.id as id, users.username as username, reviews.review as review, reviews.rating as rating, users.thumbnailUrl as thumbnailUrl,
//   (select avg(reviews.rating) from reviews where reviews.book_id = ${id}) as avgRating
//   from reviews
//   join users on reviews.user_id = users.id
//   where reviews.book_id = ${id}`
// ); combined reviews and avg rating query into one, but this only works in SQLite for now. Will try and get it working for postgreSQL

async function create(item) {
  const [id] = await db("books")
    .insert(item)
    .returning("id");
  if (id) {
    const book = await findById(id);
    return book;
  }
}

async function remove(id) {
  const book = await findById(id);
  if (book) {
    const deleted = await db("books")
      .where({ id })
      .del();
    if (deleted) {
      return book;
    }
  }
}

async function update(item, id) {
  const editedBook = await db("books")
    .where({ id })
    .update(item);
  if (editedBook) {
    const book = await findById(id);
    return book;
  }
}

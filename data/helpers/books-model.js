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
  const book = await db("books")
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
  book.reviews = await db("reviews")
    .select({
      id: "reviews.id",
      username: "users.username",
      review: "reviews.review",
      rating: "reviews.rating",
      thumbnailUrl: "users.thumbnailUrl"
    })
    .innerJoin("users", "reviews.user_id", "users.id")
    .where({
      "reviews.book_id": id
    });
  return book;
}

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

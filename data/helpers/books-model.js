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
  let bookReviews = db.raw(
    `select reviews.id as id, users.username as username, reviews.review as review, reviews.rating as rating, users.thumbnailUrl as thumbnailUrl, 
    (select avg(reviews.rating) from reviews where reviews.book_id = ${id}) as avgRating 
    from reviews 
    join users on reviews.user_id = users.id
    where reviews.book_id = ${id}`
  );
  const retrieval = await Promise.all([bookContent, bookReviews]);
  if (retrieval[0]) {
    /* This is only true if both the promise resolved AND the post exists. Checking for just the promise causes
    nonexistent posts to return an empty object and array due to my return statement */
    let content = retrieval[0];
    let reviews = retrieval[1];
    let rating = reviews[0].avgRating;
    return { ...content, rating, reviews };
  }
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

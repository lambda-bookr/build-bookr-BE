const db = require("../dbConfig.js");

module.exports = {
  find,
  findById,
  create,
  remove,
  update
};

async function find() {
  const books = await db.raw(
    `select books.id as id, books.user_id as user_id, books.title as title, books.author as author, books.price as price, books.publisher as publisher, books.image_url as "imageUrl", books.description as description, (select avg(reviews.rating) from reviews where reviews.book_id = books.id) as rating from books left join reviews on reviews.book_id = books.id group by books.id order by books.id`
  );
  if (process.env.DB_ENVIRONMENT === "production") {
    return books.rows;
  }
  return books;
}

async function findById(id) {
  let bookContent = db.raw(
    `select books.id as id, books.user_id as user_id, users.first_name as "firstName", users.last_name as "lastName", users.username as username, users.thumbnail_url as "thumbnailUrl", books.title as title, books.author as author, books.price as price, books.publisher as publisher, books.image_url as "imageUrl", books.description as description, (select avg(reviews.rating) from reviews where reviews.book_id = ${id}) as rating from books left join reviews on reviews.book_id = books.id join users on books.user_id = users.id where books.id = ${id}`
  );
  let bookReviews = db("reviews")
    .select({
      id: "reviews.id",
      review: "reviews.review",
      rating: "reviews.rating",
      username: "users.username",
      thumbnailUrl: "users.thumbnail_url"
    })
    .innerJoin("users", "reviews.user_id", "users.id")
    .where({ "reviews.book_id": id });
  const retrieval = await Promise.all([bookContent, bookReviews]);
  if (process.env.DB_ENVIRONMENT === "production") {
    if (retrieval[0].rows[0]) {
      let [content] = retrieval[0].rows;
      let reviews = retrieval[1];
      return { ...content, reviews };
    }
  }
  if (retrieval[0][0]) {
    /* This is only true if both the promise resolved AND the post exists. Checking for just the promise causes
    nonexistent posts to return an empty object and array due to my return statement returning an object by default */
    let [content] = retrieval[0];
    let reviews = retrieval[1];
    return { ...content, reviews };
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

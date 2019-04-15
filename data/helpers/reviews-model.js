const db = require("../dbConfig.js");

module.exports = {
  find,
  findById,
  create,
  remove,
  update
};

async function find(id) {
  const reviews = await db("reviews")
    .select({
      id: "reviews.id",
      review: "reviews.review",
      rating: "reviews.rating",
      username: "profiles.username",
      thumbnailUrl: "profiles.thumbnailUrl"
    })
    .innerJoin("profiles", "reviews.user_id", "profiles.id")
    .orderBy("id", "asc")
    .where({ book_id: id });
  return reviews;
}

async function findById(id) {
  const review = await db("reviews")
    .select({
      id: "reviews.id",
      review: "reviews.review",
      rating: "reviews.rating",
      username: "profiles.username",
      thumbnailUrl: "profiles.thumbnailUrl"
    })
    .innerJoin("profiles", "reviews.user_id", "profiles.id")
    .where({ "reviews.id": id })
    .first();
  return review;
}

async function create(item) {
  const [id] = await db("reviews")
    .insert(item)
    .returning("id");
  if (id) {
    const review = await findById(id);
    return review;
  }
}

async function remove(id) {
  const review = await findById(id);
  if (review) {
    const deleted = await db("reviews")
      .where({ id })
      .del();
    if (deleted) {
      return review;
    }
  }
}

async function update(item, id) {
  const editedReview = await db("reviews")
    .where({ id })
    .update(item);
  if (editedReview) {
    const review = await findById(id);
    return review;
  }
}

const db = require("../dbConfig.js");

module.exports = {
  find,
  findById,
  findByUser,
  create,
  remove,
  update
};

async function find() {
  const users = await db("users");
  return users;
}

async function findById(id) {
  const user = await db("users")
    .select({
      id: "id",
      firstName: "first_name",
      lastName: "last_name",
      username: "username",
      password: "password",
      thumbnailUrl: "thumbnail_url"
    })
    .where({ id })
    .first();
  return user;
}

async function findByUser(username) {
  const user = await db("users")
    .where({ username })
    .first();
  return user;
}

async function create(item) {
  const [id] = await db("users")
    .insert(item)
    .returning("id");
  if (id) {
    const user = await findById(id);
    return user;
  }
}

async function remove(id) {
  const user = await findById(id);
  if (user) {
    const deleted = await db("users")
      .where({ id })
      .del();
    if (deleted) {
      return user;
    }
  }
}

async function update(item, id) {
  const editedUser = await db("users")
    .where({ id })
    .update(item);
  if (editedUser) {
    const user = await findById(id);
    return user;
  }
}

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", table => {
      table.increments();
      table.string("first_name", 30).notNullable();
      table.string("last_name", 40).notNullable();
      table
        .string("username", 30)
        .notNullable()
        .unique();
      table.string("password", 100).notNullable();
      table
        .string("thumbnail_url", 256)
        .defaultTo("https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg");
    })
    .createTable("books", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("author", 40).notNullable();
      table.string("title", 40).notNullable();
      table.float("price").notNullable();
      table.string("publisher", 40).notNullable();
      table.string("description", 600);
      table.string("image_url", 256);
    })
    .createTable("reviews", table => {
      table.increments();
      table.string("review", 600).notNullable();
      table.integer("rating").notNullable();
      table
        .integer("book_id")
        .unsigned()
        .references("books.id")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("reviews")
    .dropTableIfExists("books")
    .dropTableIfExists("users");
};

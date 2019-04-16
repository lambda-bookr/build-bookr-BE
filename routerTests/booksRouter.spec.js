const request = require("supertest");
const server = require("../api/server.js");
const db = require("../data/dbConfig.js");

describe("server.js", () => {
  beforeEach(async () => {
    await db("books").truncate();
  });
  describe("GET /books", () => {
    it("Should return status code 200 OK", async () => {
      const response = await request(server).get("/api/books");
      expect(response.status).toBe(200);
    });
    it("should return json", async () => {
      const response = await request(server).get("/api/books");
      expect(response.type).toBe("application/json");
    });
    it("should return an array", async () => {
      const response = await request(server).get("/api/books");
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });
  describe("GET /books/:id", () => {
    it("Should return status code 200 OK", async () => {
      const response = await request(server).get("/api/books");
      expect(response.status).toBe(200);
    });
    it("should return json", async () => {
      const response = await request(server).get("/api/books");
      expect(response.type).toBe("application/json");
    });
    it("should return requested object", async () => {
      const post = {
        user_id: 1,
        firstName: "Darryl",
        lastName: "Welch",
        username: "Golda_Mohr",
        thumbnailUrl: "https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg",
        title: "Fantastic Cotton Sausages",
        author: "Jana Wunsch",
        price: 125,
        publisher: "Ferry Inc",
        imageUrl: "http://lorempixel.com/640/480",
        description:
          "Voluptate facilis ipsa impedit optio praesentium id quisquam. Deserunt facere mollitia quidem praesentium. Cum quia dolores ut dolores deleniti cupiditate. Libero optio nam consequatur perspiciatis et. Sed ullam amet qui voluptatem repellat minus consequatur. Delectus dicta voluptate atque incidunt neque ut quod."
      };
      await request(server)
        .post("/api/books")
        .send(post);
      const response = await request(server).get("/api/books/1");
      expect(response.body.title).toBe("Fantastic Cotton Sausages");
    });
    it("should return status code 404 if object doesn't exist", async () => {
      const response = await request(server).get("/api/books/10");
      expect(response.status).toBe(404);
    });
  });
  describe("POST /books", () => {
    it("should return status code 201 if successful", async () => {
      const post = {
        user_id: 1,
        firstName: "Darryl",
        lastName: "Welch",
        username: "Golda_Mohr",
        thumbnailUrl: "https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg",
        title: "Fantastic Cotton Sausages",
        author: "Jana Wunsch",
        price: 125,
        publisher: "Ferry Inc",
        imageUrl: "http://lorempixel.com/640/480",
        description:
          "Voluptate facilis ipsa impedit optio praesentium id quisquam. Deserunt facere mollitia quidem praesentium. Cum quia dolores ut dolores deleniti cupiditate. Libero optio nam consequatur perspiciatis et. Sed ullam amet qui voluptatem repellat minus consequatur. Delectus dicta voluptate atque incidunt neque ut quod."
      };
      const response = await request(server)
        .post("/api/books")
        .send(post);
      expect(response.status).toBe(201);
    });
    it("should return json if successful", async () => {
      const post = {
        user_id: 1,
        firstName: "Darryl",
        lastName: "Welch",
        username: "Golda_Mohr",
        thumbnailUrl: "https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg",
        title: "Fantastic Cotton Sausages",
        author: "Jana Wunsch",
        price: 125,
        publisher: "Ferry Inc",
        imageUrl: "http://lorempixel.com/640/480",
        description:
          "Voluptate facilis ipsa impedit optio praesentium id quisquam. Deserunt facere mollitia quidem praesentium. Cum quia dolores ut dolores deleniti cupiditate. Libero optio nam consequatur perspiciatis et. Sed ullam amet qui voluptatem repellat minus consequatur. Delectus dicta voluptate atque incidunt neque ut quod."
      };
      const response = await request(server)
        .post("/api/books")
        .send(post);
      expect(response.type).toBe("application/json");
    });
    it("should return created object if successful", async () => {
      const post = {
        user_id: 1,
        firstName: "Darryl",
        lastName: "Welch",
        username: "Golda_Mohr",
        thumbnailUrl: "https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg",
        title: "Fantastic Cotton Sausages",
        author: "Jana Wunsch",
        price: 125,
        publisher: "Ferry Inc",
        imageUrl: "http://lorempixel.com/640/480",
        description:
          "Voluptate facilis ipsa impedit optio praesentium id quisquam. Deserunt facere mollitia quidem praesentium. Cum quia dolores ut dolores deleniti cupiditate. Libero optio nam consequatur perspiciatis et. Sed ullam amet qui voluptatem repellat minus consequatur. Delectus dicta voluptate atque incidunt neque ut quod."
      };
      const response = await request(server)
        .post("/api/books")
        .send(post);
      expect(typeof response).toBe("object");
      expect(response.body.title).toBe("Fantastic Cotton Sausages");
    });
    it("should fail with status code 422 if information is incomplete", async () => {
      const response = await request(server)
        .post("/api/books")
        .send({
          title: "Random title",
          author: "Random author"
        });
      expect(response.status).toBe(422);
    });
    it("should fail with status code 500 if title is not unique", async () => {
      const post = {
        user_id: 1,
        firstName: "Darryl",
        lastName: "Welch",
        username: "Golda_Mohr",
        thumbnailUrl: "https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg",
        title: "Fantastic Cotton Sausages",
        author: "Jana Wunsch",
        price: 125,
        publisher: "Ferry Inc",
        imageUrl: "http://lorempixel.com/640/480",
        description:
          "Voluptate facilis ipsa impedit optio praesentium id quisquam. Deserunt facere mollitia quidem praesentium. Cum quia dolores ut dolores deleniti cupiditate. Libero optio nam consequatur perspiciatis et. Sed ullam amet qui voluptatem repellat minus consequatur. Delectus dicta voluptate atque incidunt neque ut quod."
      };
      const response = await request(server)
        .post("/api/books")
        .send(post);
      const response2 = await request(server)
        .post("/api/books")
        .send(post);
      expect(response2.status).toBe(500);
    });
  });
  describe("DEL /books/:id", () => {
    it("Should return status code 200 OK", async () => {
      const post = {
        user_id: 1,
        firstName: "Darryl",
        lastName: "Welch",
        username: "Golda_Mohr",
        thumbnailUrl: "https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg",
        title: "Fantastic Cotton Sausages",
        author: "Jana Wunsch",
        price: 125,
        publisher: "Ferry Inc",
        imageUrl: "http://lorempixel.com/640/480",
        description:
          "Voluptate facilis ipsa impedit optio praesentium id quisquam. Deserunt facere mollitia quidem praesentium. Cum quia dolores ut dolores deleniti cupiditate. Libero optio nam consequatur perspiciatis et. Sed ullam amet qui voluptatem repellat minus consequatur. Delectus dicta voluptate atque incidunt neque ut quod."
      };
      await request(server)
        .post("/api/books")
        .send(post);
      const response = await request(server).delete("/api/books/1");
      expect(response.status).toBe(200);
    });
    it("should return json", async () => {
      const post = {
        user_id: 1,
        firstName: "Darryl",
        lastName: "Welch",
        username: "Golda_Mohr",
        thumbnailUrl: "https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg",
        title: "Fantastic Cotton Sausages",
        author: "Jana Wunsch",
        price: 125,
        publisher: "Ferry Inc",
        imageUrl: "http://lorempixel.com/640/480",
        description:
          "Voluptate facilis ipsa impedit optio praesentium id quisquam. Deserunt facere mollitia quidem praesentium. Cum quia dolores ut dolores deleniti cupiditate. Libero optio nam consequatur perspiciatis et. Sed ullam amet qui voluptatem repellat minus consequatur. Delectus dicta voluptate atque incidunt neque ut quod."
      };
      await request(server)
        .post("/api/books")
        .send(post);
      const response = await request(server).get("/api/books/1");
      expect(response.type).toBe("application/json");
    });
    it("should return deleted object", async () => {
      const post = {
        user_id: 1,
        firstName: "Darryl",
        lastName: "Welch",
        username: "Golda_Mohr",
        thumbnailUrl: "https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg",
        title: "Fantastic Cotton Sausages",
        author: "Jana Wunsch",
        price: 125,
        publisher: "Ferry Inc",
        imageUrl: "http://lorempixel.com/640/480",
        description:
          "Voluptate facilis ipsa impedit optio praesentium id quisquam. Deserunt facere mollitia quidem praesentium. Cum quia dolores ut dolores deleniti cupiditate. Libero optio nam consequatur perspiciatis et. Sed ullam amet qui voluptatem repellat minus consequatur. Delectus dicta voluptate atque incidunt neque ut quod."
      };
      await request(server)
        .post("/api/books")
        .send(post);
      const response = await request(server).delete("/api/books/1");
      expect(response.body.title).toBe("Fantastic Cotton Sausages");
    });
    it("should return status code 404 if object doesn't exist", async () => {
      const response = await request(server).delete("/api/books/10");
      expect(response.status).toBe(404);
    });
  });
});

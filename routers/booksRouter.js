const router = require("express").Router();

const db = require("../data/helpers/books-model.js");
const Reviews = require("../data/helpers/reviews-model.js");

router.get("/", async (req, res) => {
  try {
    const books = await db.find();
    if (books) {
      res.status(200).json(books);
    }
  } catch (error) {
    res.status(500).json({ message: `Books could not be found ${error}.` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await db.findById(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res
        .status(404)
        .json({ message: "Book with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `Book request failed ${error}.` });
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    user_id,
    author,
    price,
    publisher,
    description,
    imageUrl
  } = req.body;
  if (
    !title ||
    !user_id ||
    !author ||
    !price ||
    !publisher ||
    !description ||
    !imageUrl
  ) {
    res
      .status(401)
      .json({ message: "Please do not leave any of the book fields blank." });
  } else {
    try {
      const newBook = await db.create({
        title,
        user_id,
        author,
        price,
        publisher,
        description,
        image_url: imageUrl
      });
      if (newBook) {
        res.status(201).json(newBook);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your book could not be posted ${error}.` });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await db.remove(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res
        .status(404)
        .json({ message: "The book with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      message: `The book's information could not be modified: ${error}.`
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let book = {};
  if (req.body.imageUrl) {
    book = { ...req.body, image_url: req.body.imageUrl };
    delete book.imageUrl;
  } else {
    book = req.body;
  }
  try {
    const editedBook = await db.update(book, id);
    if (editedBook) {
      res.status(200).json(editedBook);
    } else {
      res.status(404).json({
        message: "The book with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The book's information could not be modified: ${error}.`
    });
  }
});

router.get("/:id/reviews", async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await Reviews.find(id);
    if (reviews) {
      res.status(200).json(reviews);
    }
  } catch (error) {
    res.status(500).json({ message: `Reviews could not be found ${error}.` });
  }
});

module.exports = router;

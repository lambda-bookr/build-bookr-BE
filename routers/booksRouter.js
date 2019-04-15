const router = require("express").Router();

const db = require("../data/helpers/books-model.js");

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
  const book = req.body;
  try {
    const newBook = await db.create(book);
    if (newBook) {
      res.status(201).json(newBook);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Your book could not be posted ${error}.` });
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
  const newBook = req.body;

  try {
    const editedBook = await db.update(newBook, id);
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

module.exports = router;

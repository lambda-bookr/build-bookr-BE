const router = require("express").Router();

const db = require("../data/helpers/reviews-model.js");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await db.findById(id);
    if (review) {
      res.status(200).json(review);
    } else {
      res
        .status(404)
        .json({ message: "Review with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `Review request failed ${error}.` });
  }
});

router.post("/", async (req, res) => {
  const { review, rating, book_id, user_id } = req.body;
  if (!review || !rating || !book_id || !user_id) {
    res
      .status(401)
      .json({ message: "Please do not leave any of the review fields blank." });
  } else {
    try {
      const newReview = await db.create(req.body);
      if (newReview) {
        res.status(201).json(newReview);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your review could not be posted ${error}.` });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await db.remove(id);
    if (review) {
      res.status(200).json(review);
    } else {
      res
        .status(404)
        .json({ message: "The review with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      message: `The review's information could not be modified: ${error}.`
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const review = req.body;
  try {
    const editedReview = await db.update(review, id);
    if (editedReview) {
      res.status(200).json(editedReview);
    } else {
      res.status(404).json({
        message: "The review with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The review's information could not be modified: ${error}.`
    });
  }
});

module.exports = router;

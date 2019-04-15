const router = require("express").Router();

const db = require("../data/helpers/reviews-model.js");

router.get("/:id/reviews", async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await db.find(id);
    if (reviews) {
      res.status(200).json(reviews);
    }
  } catch (error) {
    res.status(500).json({ message: `Reviews could not be found ${error}.` });
  }
});

router.get("/:id/reviews/:revID", async (req, res) => {
  const { revID } = req.params;
  try {
    const review = await db.findById(revID);
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

router.post("/:id/reviews", async (req, res) => {
  const review = req.body;
  try {
    const newReview = await db.create(review);
    if (newReview) {
      res.status(201).json(newReview);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Your review could not be posted ${error}.` });
  }
});

router.delete("/:id/reviews/:revID", async (req, res) => {
  const { revID } = req.params;
  try {
    const review = await db.remove(revID);
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

router.put("/:id/reviews/:revID", async (req, res) => {
  const { revID } = req.params;
  const newReview = req.body;
  try {
    const editedReview = await db.update(newReview, revID);
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

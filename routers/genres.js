const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  Genre,
  validateGenres
} = require('../modules/genre')
// Genres schema

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});
router.get("/:id", async (req, res) => {
  const genre = await Genre.find({
    id: req.params.id
  });
  if (!genre) {
    return res.status(404).send("item not found");
  }

  res.send(genre);
});

router.post("/", async (req, res) => {
  const result = validateGenres(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  res.send(genre);
});
router.put("/:id", async (req, res) => {
  const {
    error
  } = validateGenres(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = await new Genre.findByIdAndUpdate(
    req.params.id, {
      name: req.body.name
    }, {
      new: true
    }
  );

  if (!genre) {
    return res.status(404).send("item not found");
  }

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await new Genre.findByIdAndRemove(req.params.id);

  if (!genre) {
    return res.status(404).send("item not found");
  }

  res.send(genre);
});


module.exports = router;
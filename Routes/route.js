// Import necessary modules and set up Express router
const express = require("express");
const router = express.Router();
const Question = require("../model/quizModel");

// Welcome message
router.get("/", (req, res) => {
  res.send("Welcome to the Quiz API");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const QuestionItem = require("../Models/question");

router.get("/", async (req, res) => {
  res.send("please show me your self");
});

router.get("/question", async (req, res) => {
  try {
    const question = await QuestionItem.find();
    console.log("please,,,,,");
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve question." });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const QuestionItem = require("../Models/question");

router.get("/question", async (req, res) => {
  try {
    const question = await QuestionItem.find();
    console.log(question);
    res.json(question);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Could not retrieve question." });
  }
});


module.exports = router;

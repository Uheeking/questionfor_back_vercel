const express = require("express");
const router = express.Router();
const QuestionItem = require("../Models/question");

// router.post("/", async (req, res) => {
//   try {
//     const question = new QuestionItem(req.body);
//     const savedQuestion = await question.save();
//     res.json(savedQuestion);
//   } catch (error) {
//     res.status(500).json({ error: "Could not create a new question." });
//   }
// });

router.get("/question", async (req, res) => {
  try {
    const question = await QuestionItem.find();
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve question." });
  }
});

// router.patch("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { answer } = req.body;
//     const existingQuestion = await QuestionItem.findOne({ _id: id });

//     if (existingQuestion) {
//       await QuestionItem.updateOne({ _id: id }, { answer });
//       res.json({ message: "Question updated successfully." });
//     }
//   } catch (error) {
//     console.error("Error adding question:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   await QuestionItem.deleteOne({ _id: req.params.id });
//   res.json({ message: "question deleted." });
// });

module.exports = router;

const express = require("express");
const router = express.Router();
const QuestionItem = require("../Models/question");

router.post("/question", async (req, res) => {
  //  #swagger.tags = ['Question API']
  //  #swagger.summary = '질문 등록하기'
  //  #swagger.description = 'Uheeking에 대한 질문 등록하기입니다. '
  try {
    const question = new QuestionItem(req.body);
    const savedQuestion = await question.save();
    res.json(savedQuestion);
  } catch (error) {
    res.status(500).json({ error: "Could not create a new question." });
  }
});

router.get("/question", async (req, res) => {
  //  #swagger.tags = ['Question API']
  //  #swagger.summary = '질문 가져오기'
  //  #swagger.description = 'Uheeking에 대한 질문을 가져옵니다.
  try {
    const question = await QuestionItem.find();
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve question." });
  }
});

router.patch("/question/:id", async (req, res) => {
  //  #swagger.tags = ['Question API']
  //  #swagger.summary = 'id별 질문 답변 등록하기'
  //  #swagger.description = 'id별 Uheeking에 대한 질문 답변 등록하기입니다.
  try {
    const { id } = req.params;
    const { answer } = req.body;
    const existingQuestion = await QuestionItem.findOne({ _id: id });

    if (existingQuestion) {
      await QuestionItem.updateOne({ _id: id }, { answer });
      res.json({ message: "Question updated successfully." });
    }
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/question/:id", async (req, res) => {
  //  #swagger.tags = ['Question API']
  //  #swagger.summary = '질문 삭제하기'
  //  #swagger.description = 'Uheeking에 대한 질문을 삭제합니다.
  await QuestionItem.deleteOne({ _id: req.params.id });
  res.json({ message: "question deleted." });
});

module.exports = router;

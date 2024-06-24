const express = require("express");
const router = express.Router();
const LikeItem = require("../Models/like");

router.post("/like/:id", async (req, res) => {
  //  #swagger.tags = ['Like API']
  //  #swagger.summary = 'id별 like하기'
  //  #swagger.description = 'id별로 좋아요, 삭제합니다.  '
  try {
    console.log("백엔드 돌아가는 중");

    const { id } = req.params;
    const { isLiked } = req.body;
    console.log(id, isLiked);
    const existingLike = await LikeItem.findOne({ _id: id });

    if (existingLike) {
      await LikeItem.deleteOne({ _id: id });
      console.log("삭제되었습니다. ");
      res.json({
        _id: id,
        like: isLiked,
        message: "LikeItem deleted successfully.",
      });
    } else {
      const newLike = new LikeItem({ _id: id, like: isLiked });
      const savedLike = await newLike.save();
      console.log(newLike);
      res.json(savedLike);
    }
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/like", async (req, res) => {
  //  #swagger.tags = ['Like API']
  //  #swagger.summary = 'like 정보보기'
  //  #swagger.description = 'like를 한 유저의 정보를 가져옵니다. '
  try {
    const like = await LikeItem.find();
    res.json(like);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve like." });
  }
});

module.exports = router;

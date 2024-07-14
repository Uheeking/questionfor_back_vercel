const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("please show me your self");
});

module.exports = router;

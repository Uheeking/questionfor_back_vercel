const mongoose = require("mongoose");

const kakaoSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
  },
});
module.exports = mongoose.model("Kakao", kakaoSchema);

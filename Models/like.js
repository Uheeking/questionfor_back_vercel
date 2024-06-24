const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  bno: {
    type: mongoose.Schema.ObjectId,
  },
  like: {
    type: Boolean,
  },
});
module.exports = mongoose.model("Like", LikeSchema);

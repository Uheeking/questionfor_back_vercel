const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://question-for.vercel.app/",
      ]; // Add other allowed origins if needed
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const PORT = process.env.PORT || 3002;
app.set("port", process.env.PORT || 3002);

app.get("/", (req, res) => {
  res.send("Hello, Express");
});
app.use("/test", require("./test"))
app.use("/question", require("./question"));
app.use("/like", require("./like"));
app.use("/oauth", require("./oauth"));
mongoose
  .connect(process.env.DB, {})
  .then(() => console.log("connect to database"));

app.listen(PORT, () => {
  console.log(PORT, "번 포트에서 대기 중");
});

module.exports = app;

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Middleware setup
app.use(bodyParser.json());

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:3000", "https://question-for.vercel.app"];
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

app.get("/", (req, res) => {
  res.send("Hello, Express");
});


app.use("/api", require("./question"));
app.use("/api", require("./like"));
app.use("/api/oauth", require("./oauth"));


mongoose
  .connect(process.env.DB, {})
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Database connection error:", err));

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 대기 중`);
});

module.exports = app;



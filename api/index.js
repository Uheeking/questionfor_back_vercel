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
var whitelist = ["http://localhost:3000", "https://question-for.vercel.app"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.header('Origin'));
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

const PORT = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

// Importing routes
// app.use("/api", require("./proxysettings"));
app.use("/api", cors(corsOptionsDelegate), require("./question"));
app.use("/api", require("./like"));
app.use("/api/oauth", require("./oauth"));

// Swagger setup (commented out in your original code)
// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerFile, { explorer: true })
// );

mongoose
  .connect(process.env.DB, {})
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Database connection error:", err));

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 대기 중`);
});

module.exports = app;

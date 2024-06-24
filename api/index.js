const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swaggerFile = require("./swaggerFile/swagger-output.json");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
app.use(bodyParser.json());
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:3000", "https://question-for.vercel.app/"]; // Add other allowed origins if needed
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

const PORT = process.env.PORT;
app.set("port", process.env.PORT || 3002);

app.get("/", (req, res) => {
  res.send("Hello, Express");
});
app.use("/api", require("./api/question"));
app.use("/api", require("./api/like"));
app.use("/api/oauth", require("./api/oauth"));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { explorer: true })
);
mongoose
  .connect(process.env.DB,  {})
  .then(() => console.log("connect to database"));

app.listen(PORT, () => {
  console.log(PORT, "번 포트에서 대기 중");
});

module.exports = app;

<<<<<<< HEAD
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

=======
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

>>>>>>> 5d8d0e6d694063e3d0f88aa6c80a5d383d88d257
module.exports = app;
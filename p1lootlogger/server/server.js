require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const path = require("path");
const app = express();
const port = process.env.P1LL_SERVER || 8080;

app.use("./testing2", express.static(path.join(__dirname, "testing2")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "testing2", "index.html"));
});

app.listen(port);

console.log(chalk.green(`listening on port ${port}`));

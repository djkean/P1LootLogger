require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const path = require("path");
const app = express();
const port = process.env.P1LL_SERVER || 8080;
const testApi = require("./routes/test");
const cors = require("cors");
const connection = require("./connect");

app.use("/api", testApi);
app.use(cors());

app.use(express.json());

const static_dir = path.resolve(path.join(__dirname, "../build"));
console.log(static_dir);

app.use("/", express.static(static_dir));

app.get("/*", (req, res, next) => {
  if (req.url.startsWith("/api/")) {
    next();
    return;
  }
  res.sendFile(path.join(static_dir, "index.html"));
});

app.post("/createaccount", (req, res) => {
  connection.query(
    "INSERT INTO `usertable2` (`username`,`email`,`password`,`status`) VALUES (?,?,?,'4')",
    [req.body.name, req.body.email, req.body.password],
    (err, res) => {
      if (err) console.log("error with query", err);
      if (res) console.log("success with query", res);
    }
  );
});

app.listen(port);

console.log(chalk.green(`listening on port ${port}`));

require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const path = require("path");
const app = express();
const port = process.env.P1LL_SERVER || 8080;
const testApi = require("./routes/test");
const cors = require("cors");
const connection = require("./connect");
const jwt = require("jsonwebtoken");

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
  try {
    connection.query(
      "INSERT INTO `usertable2` (`username`,`email`,`password`,`status`) VALUES (?,?,?,'4')",
      [req.body.username, req.body.email, req.body.password],
      (err, result) => {
        console.log(req.body.username);
        if (err) {
          console.log("error with query", err);
          res.status(500).send("not good");
        } else if (res) {
          console.log("success with query", result);
          res.status(200).send("success");
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

app.post("/login", (req, res) => {
  const loginQuery = "SELECT * FROM usertable2 WHERE email = ? AND password = ?";
  const loginValues = [
    req.body.email,
    req.body.password
  ]
  connection.query(loginQuery, [loginValues], (err, response) => {
    if (err) {
      return res.json("LOGIN UNSUCCESSFUL", err)
    }
    else if (response) {
      return res.json(response)
    }
  })
})

/* app.post(("/login"), (req, res) => {
  const username = req.body.username
  const user = { name: username }

  const loginToken = jwt.sign(user, process.env.P1LL_LOGINTOKEN)
  res.json({ loginToken: loginToken })
}) */

app.listen(port);

console.log(chalk.green(`listening on port ${port}`));

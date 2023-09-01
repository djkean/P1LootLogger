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
const crypto = require("crypto");

app.use("/api", testApi);
app.use(cors());
app.use(express.json());

const static_dir = path.resolve(path.join(__dirname, "../build"));
console.log(chalk.bgGreen("BUILD SUCCESSFUL"));

app.use("/", express.static(static_dir));

app.get("/*", (req, res, next) => {
  if (req.url.startsWith("/api/")) {
    next();
    return;
  }
  res.sendFile(path.join(static_dir, "index.html"));
});

app.post("/createaccount", async (req, res) => {
  try {
    const password = req.body.password
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256").toString("hex")

    connection.query(
      "INSERT INTO `usertable3` (`username`,`email`,`password`,`salt`,`status`) VALUES (?,?,?,?,'4')",
      [req.body.username, req.body.email, hash, salt],
      (err, result) => {
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
  connection.query(loginQuery, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.log(chalk.red("LOGIN QUERY UNSUCCESSFUL"), err);
      res.status(500).send("SOMETHING WENT WRONG  ");
    }
    else if (res) {
      if (result.length > 0) {
        console.log(chalk.green("LOGIN QUERY SUCCESSFUL"), result);
        res.status(200).send("LOGIN OK");
      }
      else {
        console.log(chalk.red("LOGIN UNSUCCESSFUL"));
        res.status(401).send("INCORRECT CREDENTIALS");
      }
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

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
console.log(static_dir);

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
    const password = await req.body.password.toString()
    const keystring = process.env.P1LL_HASHSTRING.toString()
    const salt = crypto.randomBytes(16).toString("hex")
    const hash4 = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256").toString("hex")
    console.log(chalk.red(hash4))

    connection.query(
      "INSERT INTO `usertable3` (`username`,`email`,`password`,`status`) VALUES (?,?,?,'4')",
      [req.body.username, req.body.email, hash4],
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
  connection.query(loginQuery, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.log("LOGIN QUERY UNSUCCESSFUL", err);
      res.status(500).send("NOT GOOD LOGIN");
    }
    else if (res) {
      if (result.length > 0) {
        console.log("successful login query", result);
        res.status(200).send("success");
      }
      else {
        console.log("LOGIN UNSUCCESSFUL");
        res.status(401).send("incorrect credentials");
      }
    }
  })
})

const testPassword = "password123"
const testSalt = crypto.randomBytes(16).toString("hex")
const hashedPass = crypto.pbkdf2Sync(testPassword, testSalt, 1000, 64, "sha256").toString("hex")
console.log(hashedPass)

/* app.post(("/login"), (req, res) => {
  const username = req.body.username
  const user = { name: username }

  const loginToken = jwt.sign(user, process.env.P1LL_LOGINTOKEN)
  res.json({ loginToken: loginToken })
}) */

app.listen(port);

console.log(chalk.green(`listening on port ${port}`));

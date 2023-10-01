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

const optOut = ["/", "/home", "/login", "/createaccount"];
const verifyUser = (req, res, next) => {
  const path = req.path
  if (optOut.includes(path)) {
    next()
  }
  else {
    console.log(chalk.yellow("CHECKING TOKEN..."));
    const header = req.headers['authorization']
    const token = header && header.split(" ")[1]
    const secret = process.env.P1LL_SECRETTOKEN
    if (token == null) {
      console.log(chalk.red("TOKEN CHECK FAIL - NO TOKEN"))
      return res.status(403).json({ message: "Invalid Token" });
    }
  
    jwt.verify(token, secret, (err, decoded) => {
      console.log(decoded)
      if (err) {
        console.log(chalk.red("TOKEN AUTH FAIL - INVALID TOKEN"))
        return res.status(403).json({ message: "Invalid Token" });
      }
      else {
        console.log(chalk.green("TOKEN CHECK OK"))
        next();
      }
    })
  }
} 

app.use(verifyUser);
app.use("/api", testApi);
app.use(cors({ origin: "http://localhost:3000" }));
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
    const { username, email, password } = req.body
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256").toString("hex")
    console.log(req.body)
    connection.query(
      "INSERT INTO `usertable3` (`username`,`email`,`password`,`salt`,`status`) VALUES (?,?,?,?,'4')",
      [username, email, hash, salt],
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

app.post("/login", async (req, res) => {
  const typedPassword = req.body.password
  const loginQuery = "SELECT `email`, `password`, `salt` FROM `usertable3` WHERE `email` = ? LIMIT 1"
  connection.query(loginQuery, [req.body.email], async (err, result) => {
    if (typeof result[0]?.email === "undefined") {
      console.log(chalk.red("LOGIN UNSUCCESSFUL, INVALID EMAIL"))
      res.status(401).send({ message: "LOGIN UNSUCCESSFUL, INVALID EMAIL" })
      return
    }
    const { email, password, salt } = result[0]
    const comparedPass = crypto.pbkdf2Sync(typedPassword, salt, 1000, 64, "sha256").toString("hex")
    if (err) {
      console.log(chalk.red("LOGIN QUERY UNSUCCESSFUL"), err);
      res.status(500).send({ message: "SOMETHING WENT WRONG" });
    }
    else if (password === comparedPass) {
      const loginToken = jwt.sign(email, process.env.P1LL_SECRETTOKEN)
      console.log(chalk.green("LOGIN SUCCESSFUL"))
      res.status(200).send({ message: "LOGIN SUCCESSFUL", loginToken: loginToken });
    }
    else {
      console.log(chalk.red("LOGIN UNSUCCESSFUL"));
      res.status(401).send({ message: "LOGIN UNSUCCESSFUL, INVALID CREDENTIALS" });
    }
  })
})

app.post("/changeusername", async (req, res) => {
  const header = req.headers['authorization']
  const token = header && header.split(" ")[1]
  const secret = process.env.P1LL_SECRETTOKEN
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(chalk.red("TOKEN AUTH FAIL - INVALID TOKEN"))
      res.status(401).send({message: "CHANGE USER QUERY FAILED INVALID TOKEN"})
    }
    else {
      const username = req.body.username
      const email = decoded
      const changeUsernameQuery = "UPDATE `usertable3` SET `username` = ? WHERE `email` = ? LIMIT 1"
      connection.query(changeUsernameQuery, [username, email], async (err, result) => {
        if (err) {
          console.log(chalk.red("ERROR WITH CHANGE USER QUERY", err))
          res.status(500).send({ message: "CHANGE USER QUERY FAILED"})
        }
        else if (res) {
          console.log(chalk.green("CHANGED USERNAME!"))
          res.status(200).send({ message: "YOUR USERNAME WAS CHANGED"})
        }
      })
    }
  })
})

app.listen(port);
console.log(chalk.bgCyan(`LISTENING ON (${port})`));

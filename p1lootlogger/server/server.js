require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const path = require("path");
const app = express();
const testApi = require("./routes/test");
const cors = require("cors");
const connection = require("./connect");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const port = process.env.P1LL_SERVER || 8080;
const secret = process.env.P1LL_SECRETTOKEN
const salt = crypto.randomBytes(16).toString("hex")
const usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
const currentUnixTime = Math.floor(Date.now() / 1000)

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
    if (token == null) {
      return res.status(403).json({ message: "403: Invalid Token" });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "403: Invalid Token" });
      }
      else {
        console.log(chalk.green("TOKEN OK"))
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
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256").toString("hex")
    connection.query(
      "INSERT INTO `usertable3` (`username`,`email`,`password`,`salt`,`status`) VALUES (?,?,?,?,'4')",
      [username, email, hash, salt],
      (err, result) => {
        if (err) {
          res.status(500).json({ message: "500: Error with query" });
        } else if (res) {
          res.status(200).json({ message: "200: Success" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: "500: Something went wrong" });
  }
});

app.post("/login", async (req, res) => {
  const typedPassword = req.body.password
  const loginQuery = "SELECT `email`,`password`,`salt` FROM `usertable3` WHERE `email` = ? LIMIT 1"
  connection.query(loginQuery, [req.body.email], async (err, result) => {
    if (typeof result[0]?.email === "undefined") {
      res.status(403).send({ message: "403: Invalid email" })
      return
    }
    const { email, password, salt } = result[0]
    const comparedPass = crypto.pbkdf2Sync(typedPassword, salt, 1000, 64, "sha256").toString("hex")
    if (err) {
      res.status(500).send({ message: "500: Something went wrong" });
    }
    else if (password === comparedPass) {
      const loginToken = jwt.sign({ email: email, expires: currentUnixTime }, process.env.P1LL_SECRETTOKEN)
      res.status(200).send({ message: "200: Success", loginToken: loginToken });
    }
    else {
      res.status(403).send({ message: "403: Invalid Credentials" });
    }
  })
})

app.post("/deleteaccount", async (req, res) => {
  const header = req.headers['authorization']
  const token = header && header.split(" ")[1]
  const typedPassword = req.body.delAccount
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(403).send({ message: "403: Invalid token" })
    }
    else if (!passwordPattern.test(typedPassword)) {
      res.status(409).send({ message: "409: Illegal password" })
    }
    else {
      const email = decoded
      const confirmPasswordQuery = "SELECT `email`,`password`,`salt` FROM `usertable3` WHERE `email` = ?"
      connection.query(confirmPasswordQuery, [email], async (err, result) => {
        if (typeof result[0]?.email === "undefined") {
          res.status(403).send({ message: "403: Invalid email" })
          return
        }
        const { email, password, salt } = result[0]
        const comparedPass = crypto.pbkdf2Sync(typedPassword, salt, 1000, 64, "sha256").toString("hex")
        if (err) {
          res.status(500).send({ message: "500: Something went wrong - (Query)" })
        }
        else if (password === comparedPass) {
          const deleteAccountQuery = "DELETE FROM `usertable3` WHERE `email` = ?"
          connection.query(deleteAccountQuery, [email], async (err, results) => {
            if (err) {
              res.status(500).send({ message: "500: Something went wrong - Query" })
            }
            else {
              res.status(200).send({ message: "200: Success" })
            }
          })
        }
        else {
          res.status(403).send({ message: "403: Invalid password" })
        }
      })
    }
  })
})

app.post("/changepassword", async (req, res) => {
  const header = req.headers['authorization']
  const token = header && header.split(" ")[1]
  const { oldPassword, newPassword1, newPassword2 } = req.body
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(403).send({ message: "403: Invalid token" })
    }
    else if (!passwordPattern.test(oldPassword) || !passwordPattern.test(newPassword1) || !passwordPattern.test(newPassword2)) {
      res.status(409).send({ message: "409: Illegal password" })
    } 
    else if (oldPassword === newPassword1 || oldPassword === newPassword2) {
      res.status(409).send({ message: "409: Old password matches new" })
    }
    else if (newPassword1 !== newPassword2) {
      res.status(409).send({ message: "409: New password fields do not match" })
    }
    else {
      const email = decoded
      const confirmPasswordQuery = "SELECT `email`,`password`,`salt` FROM `usertable3` WHERE `email` = ?"
      connection.query(confirmPasswordQuery, [email], async (err, result) => {
        if (typeof result[0]?.email === "undefined") {
          res.status(403).send({ message: "403: Invalid email" })
          return
        }
        const { email, password, salt } = result[0]
        const comparedPass = crypto.pbkdf2Sync(oldPassword, salt, 1000, 64, "sha256").toString("hex")
        if (err) {
          res.status(500).send({ message: "500: Something went wrong (Query)" })
        }
        else if (password === comparedPass) {
          const hash = crypto.pbkdf2Sync(newPassword1, salt, 1000, 64, "sha256").toString("hex")
          const changePasswordQuery = "UPDATE `usertable3` SET `password` = ?, `salt` = ? WHERE `email` = ? LIMIT 1"
          connection.query(changePasswordQuery, [hash, salt, email], async (err, results) => {
            if (err) {
              res.status(500).send({ message: "500: Something went wrong - Query" })
            }
            else {
              res.status(200).send({ message: "200: Success" })
            }
          })
        }
        else {
          res.status(403).send({ message: "403: Invalid Password" })
        }
      })
    }
  })
})

app.post("/changeusername", async (req, res) => {
  const header = req.headers['authorization']
  const token = header && header.split(" ")[1]
  const username = req.body.username
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(403).send({ message: "403: Invalid token" })
    }
    else if (!usernamePattern.test(username)) {
      res.status(409).send({ message: "409: Illegal username" })
    }
    else {
      const isUsernameUnique = "SELECT `username` FROM `usertable3` WHERE `username` = ?"
      connection.query(isUsernameUnique, [username], async (err, usernames) => {
        if (usernames.length !== 0) {
          res.status(409).send({ message: "409: Username already taken" })
        }
        else {
          const email = decoded
          const changeUsernameQuery = "UPDATE `usertable3` SET `username` = ? WHERE `email` = ? LIMIT 1"
          connection.query(changeUsernameQuery, [username, email], async (err, result) => {
            if (err) {
              res.status(500).send({ message: "500: Something went wrong - (Query)" })
            }
            else if (result) {
              res.status(200).send({ message: "200: Success" })
            }
          })
        }
      })
    }
  })
})

/* app.post("/logout", async (req, res) => {
  const header = req.headers['authorization']
  const token = header && header.split(" ")[1]
}) */

app.listen(port);
console.log(chalk.bgCyan(`LISTENING ON (${port})`));

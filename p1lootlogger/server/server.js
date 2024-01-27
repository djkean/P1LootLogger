require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const path = require("path");
const app = express();
const testApi = require("./routes/test");
const cors = require("cors");
const connection = require("./connect");
const transporter = require("./mailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const querystring = require("querystring");

const port = process.env.P1LL_SERVER || 8080;
const secret = process.env.P1LL_SECRETTOKEN;
const usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
const optOut = ["/", "/home", "/login", "/createaccount", "/forgotpassword", "/api/verifyemail", "/verifyemail", "/api/resetpassword", "/resetpassword", "/createnewpassword"];

const verifyUser = (req, res, next) => {
  const path = req.path
  console.log(path)
  if (optOut.includes(path)) {
    next()
  }
  else {
    console.log(chalk.yellow("CHECKING TOKEN..."));
    const header = req.headers['authorization']
    const token = header && header.split(" ")[1]
    if (token == null) {
      return (res.status(403).send({ message: "Invalid token", code: "yellow" }))
    }
    jwt.verify(token, secret, (err, decoded) => {
      req.email = decoded.email
      if (err) {
        return res.status(400).send({ message: "Invalid token", code: "yellow" });
      } 
      else if (!decoded.email) {
        return res.status(400).send({ message: "There is no token", code: "yellow" });
      }
      else if (decoded.expires <= Math.floor(Date.now() / 1000)) {
        return res.status(403).send({ message: "Token Expired", code: "yellow" })
      }
      console.log(chalk.green("TOKEN OK"))
      console.log(decoded)
      next();
    })
  }
} 

app.use(cors({ origin: "http://localhost:3000" }));
app.use(verifyUser);
app.use(express.json());
app.use("/api", testApi);

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
  const { username, email, firstField, secondField } = req.body
  if (username === "" || email === "") {
    return res.status(403).json({ error: "Please check that both the username and email fields are filled", response: null })
  }
  else if (firstField !== secondField) {
    return res.status(403).json({ error: "Both passwords do not match", response: null })
  }
  else if (!usernamePattern.test(username)) {
    return res.status(403).json({ error: "Make sure that your username contains only Alphanumeric characters, and -_", response: null })
  }
  else if (!emailPattern.test(email)) {
    return res.status(403).json({ error: "Invalid email", response: null })
  }
  else if (!passwordPattern.test(firstField) || !passwordPattern.test(secondField)) {
    return res.status(403).json({ error: "Make sure your password contains numbers, capital, and lowercase characters", response: null })
  }
  const checkUserEmailQuery = "SELECT CASE WHEN EXISTS (SELECT 1 FROM `usertable4` WHERE `username` = ?) THEN 'username is taken' WHEN EXISTS (SELECT 1 FROM `usertable4` WHERE `email` = ?) THEN 'email is already used' ELSE 'username and email are available' END AS result"
  connection.query(checkUserEmailQuery, [username, email], async (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "An error occurred, please try again", response: null })
    }
    const resFromDb = result[0].result
    if (resFromDb == "email is already used") {
      console.log(result)
      return res.status(403).json({ error: "This email is already in use", response: null })
    }
    else if (resFromDb == "username is taken") {
      console.log(result)
      return res.status(403).json({ error: "This username is taken", response: null })
    }
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const accountToken = crypto.randomBytes(16).toString("hex")
    const verifyEmailUrl = `http://localhost:3000/verifyemail?token=${querystring.escape(accountToken)}&email=${querystring.escape(email)}`;
    const verifyEmailBody = `Click <a href=${verifyEmailUrl}>here</a> to confirm.`;
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(firstField, salt, 1000, 64, "sha256").toString("hex")
    const createAccountQuery = "INSERT INTO `usertable4` (`username`, `email`, `password`, `salt`, `createdAt`, `token`, `status`) VALUES (?, ?, ?, ?, ?, ?, 5)"
    connection.query(createAccountQuery, [username, email, hash, salt, currentTimestamp, accountToken], async (error, results) => {
      if (error) {
        return res.status(500).json({ error: "An error has occurred, please try again", response: null })
      }
      //make mailinfo reusable for other email cases
      const emailInfo = {
        from: process.env.P1LL_MAIL,
        to: email,
        subject: "Confirm Registration",
        text: verifyEmailUrl,
        html: `<b>${verifyEmailBody}</b>`,
      }
      transporter.sendMail(emailInfo, function(err, info) {
        if (err) {
          return res.status(500).json({ error: "Error occurred during mailing, please try again", response: null });
        }
        res.status(200).json({ error: null, response: `Confirmation email has been sent to ${email}` });
      })
    })
  })
})



app.post("/login", async (req, res) => {
  const typedPassword = req.body.password
  const loginQuery = "SELECT `email`,`password`,`salt`,`status` FROM `usertable4` WHERE `email` = ? LIMIT 1"
  connection.query(loginQuery, [req.body.email], async (err, result) => {
    if (typeof result[0]?.email === "undefined") {
      return res.status(403).send({ message: "Invalid email", code: "red" })
    }
    const { email, password, salt, status } = result[0]
    const comparedPass = crypto.pbkdf2Sync(typedPassword, salt, 1000, 64, "sha256").toString("hex")
    if (err) {
      return res.status(500).send({ message: "Something went wrong - (Query)", code: "red" });
    }
    else if (password === comparedPass) {
      const currentTime = Math.floor(Date.now() / 1000)
      const tokenExpires = currentTime + 7200
      const loginToken = jwt.sign({ 
        email: email, expires: tokenExpires, iat: currentTime, status: status
      }, process.env.P1LL_SECRETTOKEN)
      return res.status(200).send({ message: "You have logged in", code: "green", loginToken: loginToken });
    }
      return res.status(403).send({ message: "Invalid Credentials", code: "red" });
  })
})

app.post("/forgotpassword", async (req, res) => {
  const typedEmail = req.body.email
  if (!emailPattern.test(typedEmail)) {
    return res.status(409).send({ message: "Invalid email", code: "red" })
  }
  const forgotPasswordToken = crypto.randomBytes(16).toString("hex")
  const forgotPasswordUrl = `http://localhost:3000/resetpassword?token=${querystring.escape(forgotPasswordToken)}&email=${querystring.escape(typedEmail)}`;
  const forgotPasswordBody = `If you requested this email, click <a href=${forgotPasswordUrl}>here</a> to change your password. If you didn't request this email, you can safely ignore this email.`;
  const confirmEmailQuery = "SELECT `email` from `usertable4` where `email` = ? LIMIT 1"
  connection.query(confirmEmailQuery, [typedEmail], async (err, result) => {
    if (err) {
      return res.status(500).send({ message: "Something went wrong (Query)", code: "red" })
    }
    else if (typeof result[0]?.email === "undefined") {
      return res.status(403).send({ message: "Could not find an account tied to this email", code: "red" })
    }
    const emailInfo = {
      from: process.env.P1LL_MAIL,
      to: typedEmail,
      subject: "Forgot Password?",
      text: forgotPasswordUrl,
      html: `<b>${forgotPasswordBody}</b>`,
    }
    transporter.sendMail(emailInfo, function(err, info) {
      if (err) {
        return res.status(500).send({ message: "Error when sending email", code: "red" })
      }
      console.log(`Sent to ${typedEmail}, issuing request timestamp...`)
      const currentTime = Math.floor(Date.now() / 1000)
      const createRequestTimestampQuery = "UPDATE `usertable4` SET `requestedAt` = ?, `requestToken` = ? WHERE `email` = ? LIMIT 1"
      connection.query(createRequestTimestampQuery, [currentTime, forgotPasswordToken, typedEmail], async (error, results) => {
        if (error) {
          return res.status(500).json({ message: "An error occurred, please try again", code: "red" })
        }
        res.status(200).json({ message: `Email sent to ${typedEmail}`, code: "green" });
      })
    })
  })
})

app.post("/deleteaccount", async (req, res) => {
  const typedPassword = req.body.delAccount
  const tokenEmail = req.email
  const confirmPasswordQuery = "SELECT `email`,`password`,`salt` FROM `usertable4` WHERE `email` = ?"
  connection.query(confirmPasswordQuery, [tokenEmail], async (err, result) => {
    if (typeof result[0]?.email === "undefined") {
      return res.status(403).send({ message: "Invalid email", code: "red" })
    }
    else if (!passwordPattern.test(typedPassword)) {
      return res.status(409).send({ message: "Invalid password", code: "red" })
    }
    const { email, password, salt } = result[0]
    const comparedPass = crypto.pbkdf2Sync(typedPassword, salt, 1000, 64, "sha256").toString("hex")
    if (err) {
      return res.status(500).send({ message: "Something went wrong - (Query)", code: "red" })
    }
    else if (password === comparedPass) {
      const deleteAccountQuery = "DELETE FROM `usertable4` WHERE `email` = ?"
      connection.query(deleteAccountQuery, [email], async (err, results) => {
        if (err) {
          return res.status(500).send({ message: "Something went wrong - Query", code: "red" })
        }
        return res.status(200).send({ message: "Your account has been successfully deleted", code: "green" })
      })
    }
    else {
      return res.status(403).send({ message: "Invalid password", code: "red" })
    }
  })
})

app.post("/changepassword", async (req, res) => {
  const { oldPassword, newPassword1, newPassword2 } = req.body
  const tokenEmail = req.email
  if (!passwordPattern.test(oldPassword) || !passwordPattern.test(newPassword1) || !passwordPattern.test(newPassword2)) {
    return res.status(409).send({ message: "Invalid password", code: "red" })
  } 
  else if (oldPassword === newPassword1 || oldPassword === newPassword2) {
    return res.status(409).send({ message: "Your new password must be different", code: "red" })
  }
  else if (newPassword1 !== newPassword2) {
    return res.status(409).send({ message: "New password fields do not match", code: "red" })
  }
  else {
    const confirmPasswordQuery = "SELECT `email`,`password`,`salt` FROM `usertable4` WHERE `email` = ?"
    connection.query(confirmPasswordQuery, [tokenEmail], async (err, result) => {
      if (typeof result[0]?.email === "undefined") {
        res.status(403).send({ message: "Invalid email", code: "red" })
        return
      }
      const { email, password, salt } = result[0]
      const comparedPass = crypto.pbkdf2Sync(oldPassword, salt, 1000, 64, "sha256").toString("hex")
      if (err) {
        return res.status(500).send({ message: "Something went wrong (Query)", code: "red" })
      }
      else if (password === comparedPass) {
        const salt = crypto.randomBytes(16).toString("hex")
        const hash = crypto.pbkdf2Sync(newPassword1, salt, 1000, 64, "sha256").toString("hex")
        const changePasswordQuery = "UPDATE `usertable4` SET `password` = ?, `salt` = ? WHERE `email` = ? LIMIT 1"
        connection.query(changePasswordQuery, [hash, salt, email], async (err, results) => {
          if (err) {
            return res.status(500).send({ message: "Something went wrong - Query", code: "red" })
          }
          res.status(200).send({ message: "You have successfully changed your password", code: "green" })
        })
      }
      res.status(403).send({ message: "Invalid Password", code: "red" })
    })
  }
})

//changePasswordFunction(oldpass, newpass, retypednewpass)

app.post("/changeusername", async (req, res) => {
  const username = req.body.username
  const tokenEmail = req.email 
  if (!usernamePattern.test(username)) {
    return res.status(409).send({ message: "Invalid username", code: "red" })
  }
  const isUsernameUnique = "SELECT `username` FROM `usertable4` WHERE `username` = ?"
  connection.query(isUsernameUnique, [username], async (err, usernames) => {
    if (err) {
      return res.status(500).send({ message: "An error occurred, please try again", code: "red" })
    }
    else if (usernames.length !== 0) {
      return res.status(403).send({ message: "Username already taken", code: "red" })
    }
    const changeUsernameQuery = "UPDATE `usertable4` SET `username` = ? WHERE `email` = ? LIMIT 1"
    connection.query(changeUsernameQuery, [username, tokenEmail], async (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Something went wrong - (Query)", code: "red" })
      }
      res.status(200).send({ message: "Username changed successfully", code: "green" })
    })
  })
})

app.post("/createnewpassword", async (req, res) => {
  const {firstField, secondField, email, token} = req.body
  const authenticateUserQuery = "SELECT `email`, `requestedAt`, `requestToken` FROM `usertable4` WHERE `email` = ? LIMIT 1"
  connection.query(authenticateUserQuery, [email], async (err, result) => {
    if (err) {
      return res.status(500).send({ message: "A server error occured, please try again", code: "red" })
    }
    else if (typeof result[0]?.email === "undefined") {
      return res.status(403).send({ message: "We were unable to validate your request", code: "red" })
    }
    //const {email, requestedAt, requestToken} = result[0]
    else if (result[0]?.requestToken === "undefined") {
      return res.status(403).send({ message: "Request could not be fulfilled", code: "red" })
    }
    else if (email !== result[0]?.email || token !== result[0]?.requestToken) {
      return res.status(403).send({ message: "Authentication of request failed", code: "red" })
    }
    else if (!passwordPattern.test(firstField) || !passwordPattern.test(secondField)) {
      return res.status(409).send({ message: "Invalid password", code: "red" })
    }
    else if (firstField !== secondField) {
      return res.status(409).send({ message: "Passwords do not match", code: "red" })
    }
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(firstField, salt, 1000, 64, "sha256").toString("hex")
    const newPasswordQuery = "UPDATE `usertable4` SET `password` = ?, `salt` = ?, `requestedAt` = ?, `requestToken` = ? WHERE `email` = ? LIMIT 1"
    connection.query(newPasswordQuery, [hash, salt, null, null, email], async (err, results) => {
      if (err) {
        return res.status(500).send({ message: "An error occured during the request", code: "red" })
      }
      res.status(200).send({ message: "You have successfully changed your password", code: "green" })
    })
  })
})

app.listen(port);
console.log(chalk.bgCyan(`LISTENING ON (${port})`));

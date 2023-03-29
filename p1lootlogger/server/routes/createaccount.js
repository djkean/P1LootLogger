require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("../connect");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// createaccount
app.post("/createaccount", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  connection.execute(
    "INSERT INTO `test_schema`.`dummytable` (`username`,`email`,`password`) VALUES (?,?,?)",
    [username, email, password],
    (err, res) => {
      if (err) console.log("createaccount query error", err);
      if (res) console.log("createaccount res success", res);
    }
  );
});

/*
app.post("/createaccount", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "INSERT INTO usertable2 (username, email, password) VALUES (?,?,?)",
    [(username, email, password)],
    (err, results) => {
      if (err) throw err;
      console.log(results);
    }
  );
}); */

/* router.post("/createaccount", (req, res) => {
  connection.query = "INSERT INTO usertable2 (`username`,`email`,`password`) VALUES (?,?,?)"
}) 
*/

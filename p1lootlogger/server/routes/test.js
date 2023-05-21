require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const router = express.Router();
const connection = require("../connect");

// /api route
router.get("/", (req, res) => {
  res.send("hello from /api");
});

// /api/test route
router.get("/test", (req, res) => {
  connection.query(`SELECT * FROM itemtable`, [], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json({ status: 200, error: null, response: results });
  });
});

// bosstable route
router.get("/boss", (req, res) => {
  connection.query(`SELECT * FROM bosstable`, [], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json({ status: 200, error: null, response: results });
  });
});

// bossinfo route
router.get("bossinfo", (req, res) => {
  connection.query(`SELECT * FROM bossinfotable`, [], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json({status: 200, error: null, response, results});
  })
})

// signup
/* router.post("/createaccount", (req, res) => {
  connection.query = "INSERT INTO usertable2 (`username`,`email`,`password`) VALUES (?,?,?)"
}) */

module.exports = router;

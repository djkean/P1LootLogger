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

/*
// /api/itemtable route
router.get("/itemtable", async (req, res) => {
  const query_itemtable = await connection.execute(`SELECT * FROM itemtable`);
  res.json({ items: query_itemtable });
});

//boss route
router.get("/bosstable", async (req, res) => {
  const query_bosstable = await connection.execute(`SELECT * FROM bosstable`);
  res.json({ bosses: query_bosstable });
  console.log(res);
});
*/
module.exports = router;

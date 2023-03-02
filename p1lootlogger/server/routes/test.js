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

// /api/itemtable route
router.get("/itemtable", async (req, res) => {
  const query_itemtable = await connection.execute(`SELECT * FROM itemtable`);
  res.json({ items: query_itemtable });
});

module.exports = router;

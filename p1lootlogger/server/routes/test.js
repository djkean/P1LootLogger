require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const router = express.Router();
const connection = require("../connect");

/* router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
}); */

// /api route
router.get("/", (req, res) => {
  res.send("hello from /api");
});

// /api/test route
router.get("/test", (req, res) => {
  connection.query(
    `SELECT * FROM itemtable WHERE itemID = 1`,
    [],
    (err, results) => {
      if (err) throw err;
      console.log(results);
      res.json({ status: 200, error: null, response: results });
    }
  );
});

// /api/itemtable route
router.get("/itemtable", async (req, res) => {
  const query_itemtable = await connection.execute(`SELECT * FROM itemtable`);
  res.json({ items: query_itemtable });
});

/* connection.execute(
  `SELECT * FROM itemtable WHERE itemID = '${test}'`,
  (err, res) => {
    if (err) console.log("error with query", err);
    if (res) console.log("res success", res);
    connection.destroy();
  }
); */

module.exports = router;

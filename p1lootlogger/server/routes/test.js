require("dotenv").config();
const express = require("express");
const router = express.Router();
const connection = require("../connect");

// /api route
router.get("/", (req, res) => {
  res.send("hello from /api");
});

// /api/test route
router.get("/test", (req, res) => {
  connection.query(`SELECT * FROM newitemtable`, [], (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, response: results });
  });
});

// bosstable route
router.get("/boss", (req, res) => {
  connection.query(`SELECT * FROM bosstable`, [], (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, response: results });
  });
});

// bossinfo route
router.get("/bossinfo", (req, res) => {
  connection.query(`SELECT * FROM bossinfotable2`, [], (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, response: results });
  })
})

// bossdetails route
// same route before adding specific params to above
router.get("/bossdetails", (req, res) => {
  connection.query(`SELECT * FROM bossinfotable2`, [], (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, response: results });
  })
})

// verifyemail
router.post("/verifyemail", (req, res) => {
  console.log(req.body)
  const {token, email} = req.body
  const verifyEmailQuery = "SELECT `email`, `token`, `status` FROM `usertable4` WHERE `email` = ? LIMIT 1"
  connection.query(verifyEmailQuery, [email], (err, result) => {
    if (err) {
      res.json({ status: 500, error: "Verification failed, please try again", response: null })
    } 
    else if (result[0].token === token) {
      if (result[0].status === 4) {
        res.json({ status: 409, error: "Your account has already been verified", response: null })
      } else {
        const updateStatusQuery = "UPDATE `usertable4` SET `status` = 4 WHERE `email` = ?"
        connection.query(updateStatusQuery, [email], (error, response) => {
          if (error) {
            res.json({ status: 500, error: "Something went wrong, please try again", response: null })
          } else {
            res.json({ status: 200, error: null, response: "Your account is now verified" })
          }
        })
      }
    } else {
      res.json({ status: 403, error: "Verification failed. Invalid Token", response: null })
    }
  })
})

module.exports = router;

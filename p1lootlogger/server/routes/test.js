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
      return res.json({ status: 500, error: "Verification failed, please try again", response: null })
    } 
    else if (result[0].token === token) {
      if (result[0].status === 4) {
        res.json({ status: 409, error: "Your account has already been verified", response: null })
      } else {
        const updateStatusQuery = "UPDATE `usertable4` SET `status` = 4 WHERE `email` = ?"
        connection.query(updateStatusQuery, [email], (error, response) => {
          if (error) {
            return res.json({ status: 500, error: "Something went wrong, please try again", response: null })
          } else {
            res.json({ status: 200, error: null, response: "Your account is now verified" })
          }
        })
      }
    } else {
      return res.json({ status: 403, error: "Verification failed. Invalid Token", response: null })
    }
  })
})

// reset password
router.post("/resetpassword", (req, res) => {
  console.log(req.body)
  const {token, email} = req.body
  const approveResetQuery = "SELECT `email`, `requestToken`, `requestedAt` FROM `usertable4` WHERE `email` = ?"
  connection.query(approveResetQuery, [email], (err, result) => {
    const currentTime = Math.floor(Date.now() / 1000)
    if (err) {
      return res.json({ status: 500, error: "Request failed, please try again", response: null })
    }
    else if (currentTime > (result[0].requestedAt + 600)) {
      return res.json({ status: 403, error: "Reset link expired: Please resend your forgot password request", response: null })
    }
    else if (result[0]?.requestToken !== token) {
      return res.json({ status: 403, error: "Unexpected token", response: null })
    }
    res.json({ status: 200, error: null, response: "Enter and confirm your new password" })
  })
})

//specific boss
router.get("/bossdata", (req, res) => {
  console.log(req.body)
  const id = req.body
  const singleBossQuery = "SELECT * FROM `bosstable` where `ID` = ?"
  connection.query(singleBossQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error occurred", response: null })
    }
    else if (typeof result[0] == "undefined") {
      return res.status(403).json({ error: "There is no boss for that ID", response: null })
    }
    res.status(200).json({ error: null, response: result })
  })
})

//specific boss loot
router.get("/bossloot", (req, res) => {
  console.log(req.body)
  const bossLootID = 101
  const bossLootQuery = "SELECT * FROM `lootreports` WHERE `bossID` = ?"
  connection.query(bossLootQuery, [bossLootID], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error while getting boss loot", response: null })
    }
    else if (typeof result[0]?.report_id == "undefined") {
      return res.status(400).json({ error: "There doesn't seem to be any boss with results for that query", response: null })
    }
    res.status(200).json({ error: null, response: result })
  })
})

//specific item
router.get("/itemdata", (req, res) => {
  console.log(req.body)
  const itemID = req.body
  const itemQuery = "SELECT * FROM `newitemtable` WHERE `id` = ? LIMIT 1"
  const lootTableQuery = "SELECT * FROM `lootreports` WHERE `loot1` = ? OR `loot2` = ? OR `loot3` = ? OR `loot4` = ? OR `loot5` = ?"
  if (typeof itemID !== "number") {
    return res.status(409).json({ error: "Invalid value for item ID", response: null })
  }
  connection.query(itemQuery, [itemID], (err, itemResult) => {
    if (err) {
      return res.status(500).json({ error: "An error occured getting item data", response: null })
    }
    else if (typeof result[0]?.name == "undefined") {
      return res.status(400).json({ error: "That item doesn't seem to exist", response: null })
    }
    connection.query(lootTableQuery, [itemID, itemID, itemID, itemID, itemID], (error, lootResult) => {
      if (error) {
        return res.status(500).json({ error: "An error occured getting item drop data", response: null })
      }
      else if (typeof result[0]?.report_id == "undefined") {
        return res.status(400).json({ error: "There seems to be no loot data for that item", response: null })
      }
      res.status(200).json({ error: null, response: { itemResult, lootResult } })
    })
  })
})

module.exports = router;

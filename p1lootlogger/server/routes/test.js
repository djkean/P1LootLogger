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

//dynamic boss page
router.post("/bossdata", (req, res) => {
  const id = parseInt(req.body.bossID)
  console.log(req.body)
  if (typeof id !== "number") {
    return res.status(400).json({ error: "Invalid boss id value", response: null })
  }
  const allLootDataQuery = "SELECT loot.report_id, loot.user_id, loot.trainerlevel, loot.submitted, loot.buff, loot.money, loot.boxes, loot.gold, loot.loot1 AS loot1, i1.name AS loot1name, i1.image AS loot1image, loot.loot2 AS loot2, i2.name AS loot2name, i2.image AS loot2image, loot.loot3 AS loot3, i3.name AS loot3name, i3.image AS loot3image, loot.loot4 AS loot4, i4.name AS loot4name, i4.image AS loot4image, loot.loot5 AS loot5, i5.name AS loot5name, i5.name AS loot5image, bosstable.bossName FROM lootreports AS loot LEFT JOIN newitemtable AS i1 ON loot.loot1 = i1.id LEFT JOIN newitemtable AS i2 ON loot.loot2 = i2.id LEFT JOIN newitemtable AS i3 ON loot.loot3 = i3.id LEFT JOIN newitemtable AS i4 ON loot.loot4 = i4.id LEFT JOIN newitemtable AS i5 ON loot.loot5 = i5.id LEFT JOIN bosstable ON loot.boss_id = bosstable.ID WHERE loot.boss_id = ? AND EXISTS ( SELECT 1 FROM bosstable WHERE bosstable.ID = loot.boss_id );"
  connection.query(allLootDataQuery, [id], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "An error occurred with loot query", response: null })
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
  })
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

module.exports = router;

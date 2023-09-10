require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
const connection = require("../connect");
const jwt = require("jsonwebtoken");
//const expressJwt = require("express-jwt");
const { expressJwt: eJwt } = require("express-jwt")

const JWTKEY = process.env.P1LL_LOGINTOKEN;
//const checkToken = req.headers["Authorization"].split(" ")[1], 

app.use(
  jwt({
    secret: JWTKEY,
    algorithms: ["HS256"],
    getToken: function checkToken(req) {
      const isToken = req.headers["Authorization"].split(" ")[0]
      const token = req.headers["Authorization"].split(" ")[1]
      if (req.headers.Authorization && isToken === "Bearer") {
        return token
      }
      return null
    }
  }).unless({
    //paths that opt-out of token verification
    path: ["/login", "/createaccount"],
  }
  )
) 


// /api route
router.get("/", (req, res) => {
  res.send("hello from /api");
});

// /api/test route
router.get("/test", (req, res) => {
  //jwt.verify(,process.env.P1LL_LOGINTOKEN)
  connection.query(`SELECT * FROM newitemtable`, [], (err, results) => {
    if (err) throw err;
    //console.log(results);
    res.json({ status: 200, error: null, response: results });
  });
});

// bosstable route
router.get("/boss", (req, res) => {
  connection.query(`SELECT * FROM bosstable`, [], (err, results) => {
    if (err) throw err;
    //console.log(results);
    res.json({ status: 200, error: null, response: results });
  });
});

// bossinfo route
router.get("/bossinfo", (req, res) => {
  connection.query(`SELECT * FROM bossinfotable2`, [], (err, results) => {
    if (err) throw err;
    //console.log(results);
    res.json({ status: 200, error: null, response: results });
  })
})

// bossdetails route
// same route before adding specific params to above
router.get("/bossdetails", (req, res) => {
  connection.query(`SELECT * FROM bossinfotable2`, [], (err, results) => {
    if (err) throw err;
    //console.log(results);
    res.json({ status: 200, error: null, response: results });
  })
})

module.exports = router;

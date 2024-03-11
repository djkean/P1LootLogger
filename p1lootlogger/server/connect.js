require("dotenv").config({ path: __dirname + "/.env" });
const mysql2 = require("mysql2");

// connects to local database with env variables for credentials
const connection = mysql2.createConnection({
  host: process.env.P1LL_HOST,
  user: process.env.P1LL_USER,
  password: process.env.P1LL_PASSWORD,
  database: process.env.P1LL_DATABASE,
});

module.exports = connection;

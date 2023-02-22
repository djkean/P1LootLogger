require("dotenv").config({ path: __dirname + "/.env" });
const mysql2 = require("mysql2");

console.log(process.env.P1LL_USER);

// connects to local database with env variables for credentials
const connection = mysql2.createConnection({
  host: "localhost",
  user: process.env.P1LL_USER,
  password: process.env.P1LL_PASSWORD,
  database: process.env.P1LL_DATABASE,
});

// query to itemtable to show the all data within it
connection.execute("SELECT * FROM itemtable", (err, res) => {
  if (err) console.log("error with query", err);
  //if (res) console.log("res success", res); -- don't need table being logged every connection import right now
});

module.exports = connection;

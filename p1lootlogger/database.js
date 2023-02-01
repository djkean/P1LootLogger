require("dotenv").config();
const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: "localhost",
  user: process.env.P1LL_USER,
  password: process.env.P1LL_PASSWORD,
  database: process.env.P1LL_DATABASE,
});

connection.execute("SELECT * FROM itemtable", (err, res) => {
  if (err) console.log("error with query", err);
  if (res) console.log("res success", res);
});

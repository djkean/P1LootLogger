require("dotenv").config();
const connection = require("../connect");

const thing = connection.execute(
  `SELECT * FROM itemtable WHERE itemID = '10'`,
  (err, res) => {
    if (err) console.log("error with query", err);
    if (res) console.log("res success", res);
    connection.destroy();
  }
);
console.log(thing);

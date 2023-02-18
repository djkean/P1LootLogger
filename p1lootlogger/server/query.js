require("dotenv").config();
const connection = require("./connect");

let test = 10;

//querying with WHERE for specific value from itemtable as a test
//defined and passed in a variable since i'll need that later
connection.execute(
  `SELECT * FROM itemtable WHERE itemID = '${test}'`,
  (err, res) => {
    if (err) console.log("error with query", err);
    if (res) console.log("res success", res);
    connection.destroy();
  }
);

const fs = require("fs");
require("dotenv").config();
const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: "localhost",
  user: process.env.P1LL_USER,
  password: process.env.P1LL_PASSWORD,
  database: process.env.P1LL_DATABASE,
});

const filedata = fs.readFileSync("listOfItems.txt").toString();

let newData = filedata.split("\n").map((line, i) => {
  let arrayData = line
    .replace("(", "")
    .replace("),", "")
    .replace("&eacute;", "e")
    .split(", ");
  let nameAndDesc = {
    name: arrayData[1].replaceAll("'", ""),
    description: arrayData[4].replaceAll("'", ""),
  };

  return nameAndDesc;
});

console.log(newData);

connection.execute(
  "INSERT INTO `test_schema`.`itemtable` (`itemName`,`itemDescription`,`itemValue`) VALUES (?,?,'0')",
  [newData[0].name, newData[0].description],
  (err, res) => {
    if (err) console.log("error with query", err);
    if (res) console.log("res success", res);
  }
);

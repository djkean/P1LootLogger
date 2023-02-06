const fs = require("fs");
require("dotenv").config();
const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: "localhost",
  user: process.env.P1LL_USER,
  password: process.env.P1LL_PASSWORD,
  database: process.env.P1LL_DATABASE,
});

const readItemFile = fs.readFileSync("listOfItems.txt").toString();

let formattedData = readItemFile.split("\n").map((line, i) => {
  let arrayOfData = line
    .replace("(", "")
    .replace("),", "")
    .replaceAll("&eacute;", "e")
    .replaceAll("&#39;", "'")
    .split(", ");
  let nameAndDesc = {
    name: arrayOfData[1].replaceAll("'", ""),
    description: arrayOfData[4].replaceAll("'", ""),
  };

  return nameAndDesc;
});

console.log(formattedData);

formattedData.forEach((value, index) => {
  connection.execute(
    "INSERT INTO `test_schema`.`itemtable` (`itemName`,`itemDescription`,`itemValue`) VALUES (?,?,'0')",
    [value.name, value.description],
    (err, res) => {
      if (err) console.log("error with query", err);
      if (res) console.log("res success", res);
    }
  );
});

/* connection.execute(
  "INSERT INTO `test_schema`.`dummytable` (`itemName`,`itemDescription`,`itemValue`) VALUES (?,?,'0')",
  [newData[0].name, newData[0].description],
  (err, res) => {
    if (err) console.log("error with query", err);
    if (res) console.log("res success", res);
  }
); */

const fs = require("fs");
require("dotenv").config();
const mysql2 = require("mysql2");
const connection = require("./connect");

// listOfItems is a txt file holding a lot of information I want to write to my own table(s)
const readItemFile = fs.readFileSync("listOfItems.txt").toString();

// formatting data from listOfItems by replacing characters and splitting entries into an array
let formattedData = readItemFile.split("\n").map((line, i) => {
  let arrayOfData = line
    .replace("(", "")
    .replace("),", "")
    .replaceAll("&eacute;", "e")
    .replaceAll("&#39;", "'")
    .split(", ");
  let nameAndDesc = {
    name: arrayOfData[1].replaceAll("'", ""),
    description: arrayOfData[4].replaceAll("'", "").replaceAll("â€™", "'"),
  };

  return nameAndDesc;
});

console.log(formattedData);

// each item (name and their description) are being written to a table in the database
formattedData.forEach((value, index) => {
  connection.execute(
    "INSERT INTO `test_schema`.`dummytable` (`itemName`,`itemDescription`,`itemValue`) VALUES (?,?,'0')",
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

const fs = require("fs");
require("dotenv").config();
const connection = require("./connect");

// listofitems2 is a txt file of a json object from the game my game is based on
// and contains all of their data on items which I plan to use to keep the data 
// as 1 to 1 as possible between this and their projects
const readItems = fs.readFileSync("listofitems2.txt").toString();

let formattedData = readItems.split("}").map((line, i) => {
  let arrayOfItems = line
})
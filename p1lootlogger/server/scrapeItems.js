const fs = require("fs");
require("dotenv").config();
const connection = require("./connect");

const readItems = JSON.parse(fs.readFileSync("listofitems2.json"))
//console.log(readItems)

for (let i = 0; i < readItems.items.length; i++) {
  const currentItem = readItems.items[i]

  connection.execute(
    "INSERT INTO `test_schema`.`newitemtable` (`id`,`name`,`image`,`description`) VALUES (?,?,?,?)",
    [currentItem.ID, currentItem.Name, currentItem.ID, currentItem.Description],
    (err, res) => {
      if (err) console.log("ERROR", err);
      else console.log("Success!")
    })

  //console.log(currentItem.ID, currentItem.Name, currentItem.Description)
}
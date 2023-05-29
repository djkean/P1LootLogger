const fs = require("fs");
require("dotenv").config();
const connection = require("./connect");
const chalk = require("chalk")


const DROPS_DATA = [
	"Baby Egg", "Rare+ Hour", "Shiny+ Hour", "Wild Money Hour", "Pokemon Exp+ Hour", "Money+ Hour", "Hidden Ability+ Hour", "EV Training Hour"
];

connection.execute("UPDATE `test_schema`.`bossinfotable2`SET `bossDrops` = ? WHERE `ID` = 102", 
	[JSON.stringify(DROPS_DATA)], (err, res) => {
  if (res) console.log(chalk.cyan("bossinfotable2 was successfully updated"))
});

const fs = require("fs");
require("dotenv").config();
const connection = require("./connect");
const chalk = require("chalk")


const TEAM_DATA = [
	{
		"Pokemon": "Pikachu", 
		"Nature": "Jolly", 
		"Move-1": "Focus Punch",
		"Move-2": "Knock Off",
		"Move-3": "Volt Tackle",
		"Move-4": "Extreme Speed"
	}, 
	{
		"Pokemon": "Pikachu", 
		"Nature": "Timid",
		"Move-1": "Nasty Plot",
		"Move-2": "Thunderbolt",
		"Move-3": "Grass Knot",
		"Move-4": "Hidden Power Ice"
	},
	{
		"Pokemon": "Pikachu",
		"Nature": "Lonely",
		"Move-1": "Knock Off",
		"Move-2": "Extreme Speed",
		"Move-3": "Thunderbolt",
		"Move-4": "Surf"
	},
	{
		"Pokemon": "Heracross",
		"Nature": "Jolly",
		"Move-1": "Megahorn",
		"Move-2": "Knock Off",
		"Move-3": "Facade",
		"Move-4": "Close Combat"
	},
	{
		"Pokemon": "Pidgeot",
		"Nature": "Jolly",
		"Move-1": "Brave Bird",
		"Move-2": "U-Turn",
		"Move-3": "Pursuit",
		"Move-4": "Roost"
	},
	{
		"Pokemon": "Gyarados",
		"Nature": "Impish",
		"Move-1": "Dragon Tail",
		"Move-2": "Stone Edge",
		"Move-3": "Bounce",
		"Move-4": "Dragon Dance"
	},
	{
		"Pokemon": "Snorlax",
		"Nature": "Careful",
		"Move-1": "Ice Punch",
		"Move-2": "Dynamic Punch",
		"Move-3": "Crunch",
		"Move-4": "Body Slam"
	},
	{
		"Pokemon": "Kingler",
		"Nature": "Jolly",
		"Move-1": "Swords Dance",
		"Move-2": "Liquidation",
		"Move-3": "Knock Off",
		"Move-4": "X-Scissor"
	},
	{
		"Pokemon": "Lapras",
		"Nature": "Modest",
		"Move-1": "Freeze-Dry",
		"Move-2": "Hydro Pump",
		"Move-3": "Ice Beam",
		"Move-4": "Blizzard"
	},
	{
		"Pokemon": "Feraligatr",
		"Nature": "Jolly",
		"Move-1": "Dragon Dance",
		"Move-2": "Liquidation",
		"Move-3": "Ice Punch",
		"Move-4": "Crunch"
	},
	{
		"Pokemon": "Typhlosion",
		"Nature": "Timid",
		"Move-1": "Eruption",
		"Move-2": "Focus Blast",
		"Move-3": "Fire Blast",
		"Move-4": "Solar Beam"
	},
	{
		"Pokemon": "Meganium",
		"Nature": "Calm",
		"Move-1": "Synthesis",
		"Move-2": "Leech Seed",
		"Move-3": "Energy Ball",
		"Move-4": "Toxic"
	},
	{
		"Pokemon": "Venusaur",
		"Nature": "Bold",
		"Move-1": "Synthesis",
		"Move-2": "Grass Knot",
		"Move-3": "Leech Seed",
		"Move-4": "Sludge Bomb"
	},
	{
		"Pokemon": "Charizard",
		"Nature": "Timid",
		"Move-1": "Roost",
		"Move-2": "Focus Blast",
		"Move-3": "Air Slash",
		"Move-4": "Fire Blast"
	},
	{
		"Pokemon": "Blastoise",
		"Nature": "Modest",
		"Move-1": "Hydro Pump",
		"Move-2": "Ice Beam",
		"Move-3": "Water Spout",
		"Move-4": "Scald"
	},
	{
		"Pokemon": "Gyarados (Mega)",
		"Nature": "Adamant",
		"Move-1": "Crunch",
		"Move-2": "Dragon Dance",
		"Move-3": "Waterfall",
		"Move-4": "Bounce"
	},
	{
		"Pokemon": "Venusaur (Mega)",
		"Nature": "Modest",
		"Move-1": "Knock Off",
		"Move-2": "Synthesis",
		"Move-3": "Sludge Bomb",
		"Move-4": "Giga Drain"
	},
	{
		"Pokemon": "Charizard (Mega X)",
		"Nature": "Jolly",
		"Move-1": "Roost",
		"Move-2": "Dragon Claw",
		"Move-3": "Flare Blitz",
		"Move-4": "Dragon Dance"
	},
	{
		"Pokemon": "Charizard (Mega Y)",
		"Nature": "Timid",
		"Move-1": "Roost",
		"Move-2": "Focus Blast",
		"Move-3": "Solar Beam",
		"Move-4": "Flamethrower"
	},
	{
		"Pokemon": "Blastoise (Mega)",
		"Nature": "Modest",
		"Move-1": "Scald",
		"Move-2": "Dark Pulse",
		"Move-3": "Ice Beam",
		"Move-4": "Aura Sphere"
	},
	{
		"Pokemon": "Pidgeot (Mega)",
		"Nature": "Timid",
		"Move-1": "Roost",
		"Move-2": "U-Turn",
		"Move-3": "Heat Wave",
		"Move-4": "Hurricane"
	},
	{
		"Pokemon": "Heracross (Mega)",
		"Nature": "Adamant",
		"Move-1": "Swords Dance",
		"Move-2": "Rock Blast",
		"Move-3": "Pin Missile",
		"Move-4": "Close Combat"
	}
];

connection.execute("UPDATE `test_schema`.`bossinfotable2`SET `teamData` = ? WHERE `ID` = 100", [JSON.stringify(TEAM_DATA)], (err, res) => {
  if (res) console.log(chalk.cyan("bossinfotable2 was successfully updated"))
});

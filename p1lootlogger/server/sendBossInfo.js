const fs = require("fs");
require("dotenv").config();
const connection = require("./connect");
const chalk = require("chalk")


const TEAM_DATA = [
	{
		"Pokemon": "Ninetales (Alola)",
		"Nature": "Timid",
		"Move-1": "Freeze-Dry",
		"Move-2": "Ice Beam",
		"Move-3": "Aurora Veil",
		"Move-4": "Hypnosis"
	},
	{
		"Pokemon": "Mamoswine",
		"Nature": "Adamant",
		"Move-1": "Icicle Crash",
		"Move-2": "Knock Off",
		"Move-3": "Earthquake",
		"Move-4": "Swords Dance"
	},
	{
		"Pokemon": "Garchomp",
		"Nature": "Jolly",
		"Move-1": "Stone Edge",
		"Move-2": "Earthquake",
		"Move-3": "Swords Dance",
		"Move-4": "Dragon Claw"
	},
	{
		"Pokemon": "Tyranitar",
		"Nature": "Adamant",
		"Move-1": "Swords Dance",
		"Move-2": "Stone Edge",
		"Move-3": "Ice Punch",
		"Move-4": "Crunch"
	},
	{
		"Pokemon": "Gyarados",
		"Nature": "Jolly",
		"Move-1": "Bounce",
		"Move-2": "Ice Fang",
		"Move-3": "Waterfall",
		"Move-4": "Dragon Dance"
	},
	{
		"Pokemon": "Dragonite",
		"Nature": "Adamant",
		"Move-1": "Roost",
		"Move-2": "Extreme Speed",
		"Move-3": "Fire Punch",
		"Move-4": "Outrage"
	},
	{
		"Pokemon": "Scizor",
		"Nature": "Adamant",
		"Move-1": "Swords Dance",
		"Move-2": "Roost",
		"Move-3": "Bullet Punch",
		"Move-4": "Bug Bite"
	},
	{
		"Pokemon": "Crobat",
		"Nature": "Adamant",
		"Move-1": "Roost",
		"Move-2": "Toxic",
		"Move-3": "Brave Bird",
		"Move-4": "Cross Poison"
	},
	{
		"Pokemon": "Breloom",
		"Nature": "Jolly",
		"Move-1": "Seed Bomb",
		"Move-2": "Rock Tomb",
		"Move-3": "Mach Punch",
		"Move-4": "Spore"
	},
	{
		"Pokemon": "Salamence",
		"Nature": "Jolly",
		"Move-1": "Dragon Claw",
		"Move-2": "Fire Blast",
		"Move-3": "Aqua Tail",
		"Move-4": "Earthquake"
	},
	{
		"Pokemon": "Metagross",
		"Nature": "Adamant",
		"Move-1": "Meteor Mash",
		"Move-2": "Thunder Punch",
		"Move-3": "Zen Headbutt",
		"Move-4": "Ice Punch"
	},
	{
		"Pokemon": "Weavile",
		"Nature": "Jolly",
		"Move-1": "Night Slash",
		"Move-2": "Brick Break",
		"Move-3": "Ice Shard",
		"Move-4": "Ice Punch"
	},
	{
		"Pokemon": "Lucario",
		"Nature": "Jolly",
		"Move-1": "Extreme Speed",
		"Move-2": "Swords Dance",
		"Move-3": "Close Combat",
		"Move-4": "Bullet Punch"
	},
	{
		"Pokemon": "Drapion",
		"Nature": "Jolly",
		"Move-1": "Fire Fang",
		"Move-2": "Swords Dance",
		"Move-3": "Crunch",
		"Move-4": "Poison Jab"
	},
	{
		"Pokemon": "Gallade",
		"Nature": "Jolly",
		"Move-1": "Close Combat",
		"Move-2": "Leaf Blade",
		"Move-3": "Psycho Cut",
		"Move-4": "Drain Punch"
	},
	{
		"Pokemon": "Chandelure",
		"Nature": "Timid",
		"Move-1": "Shadow Ball",
		"Move-2": "Fire Blast",
		"Move-3": "Energy Ball",
		"Move-4": "Will-O-Wisp"
	},
	{
		"Pokemon": "Galvantula",
		"Nature": "Timid",
		"Move-1": "Thunder",
		"Move-2": "Bug Buzz",
		"Move-3": "Giga Drain",
		"Move-4": "Volt Switch"
	},
	{
		"Pokemon": "Krookodile",
		"Nature": "Jolly",
		"Move-1": "Dragon Claw",
		"Move-2": "Dig",
		"Move-3": "Crunch",
		"Move-4": "Stone Edge"
	}
];

connection.execute("UPDATE `test_schema`.`bossinfotable2`SET `teamData` = ? WHERE `ID` = 102", [JSON.stringify(TEAM_DATA)], (err, res) => {
  if (res) console.log(chalk.cyan("bossinfotable2 was successfully updated"))
});

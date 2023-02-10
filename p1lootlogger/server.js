require("dotenv").config();
const express = require("express");
const chalk = require("chalk");

const app = express();
const port = process.env.P1LL_SERVER || 8080;

app.use(express.json());

app.listen(port);

console.log(chalk.green(`listening on port ${port}`));

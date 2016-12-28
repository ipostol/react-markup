#! /usr/bin/env node
const shell = require("shelljs");

const path = process.env.PWD;

shell.cd(`${__dirname}/../`);
shell.exec(`npm start -- path=${path}`);

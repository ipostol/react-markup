#! /usr/bin/env node
const shell = require("shelljs");

const path = process.env.PWD;

console.log(path, '||');

shell.cd(`${__dirname}/../`);
shell.exec('pwd');
shell.exec(`npm start -- path=${path}`);

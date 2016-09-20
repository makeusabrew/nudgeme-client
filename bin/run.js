#!/usr/bin/env node

const Nudge = require("../lib/nudge");
const nudge = new Nudge();

const defaults = require(`${process.env.HOME}/.nudgeme.json`);

const params = Object.assign({}, defaults, {});

nudge.configure(params)
.send(process.argv.slice(2).join(" "))
.then(response => {
  console.log("Nudge sent!", response);
})
.catch(e => {
  console.error("Oh no, an error!", e);
});

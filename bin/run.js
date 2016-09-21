#!/usr/bin/env node

const prompt = require("prompt");
const fs = require("fs");

const configPath = `${process.env.HOME}/.nudgeme.json`;

const Nudge = require("../lib/nudge");

const run = defaults => {
  console.log("Sending nudge...");

  const nudge = new Nudge();

  nudge.configure(defaults)
  .send(process.argv.slice(2).join(" "))
  .then(response => {
    console.log(response);
  })
  .catch(e => {
    if (e.response) {
      console.error(e.response.body);
    } else {
      console.error(e);
    }
  });
};

try {
  run(require(configPath));
} catch(e) {
  const params = {
    properties: {
      email: {
        description: "What's your email? (one-time only)",
        message: "Please enter a valid email",
        pattern: /@/,
        required: true
      }
    }
  };

  prompt.start();
  prompt.get(params, (err, result) => {
    if (err) {
      console.error("Couldn't read details");
      return process.exit(1);
    }

    const defaults = {
      email: result.email
    };
    fs.writeFileSync(configPath, JSON.stringify(defaults, null, 2));
    run(defaults);
  });
}

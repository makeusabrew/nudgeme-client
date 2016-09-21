const rp = require("request-promise");

class Nudge {
  constructor() {
  }

  configure(params) {
    this.params = params;

    this.params.host = this.params.host || "https://nudgeme.now.sh";

    return this;
  }

  send(when) {
    return rp({
      method: "POST",
      uri: `${this.params.host}/nudge`,
      json: true,
      body: {
        email: this.params.email,
        when: when
      }
    });
  }
}

module.exports = Nudge;

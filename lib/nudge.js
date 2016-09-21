const rp = require("request-promise");

class Nudge {
  configure(params) {

    this.params = Object.assign({
      host: "https://nudgeme.now.sh",
    }, params);

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

const { expect } = require("chai");
const config = require('./../../lib/util/config');

describe("Testing Config", () => {
  it("Testing Content", () => {
    expect(config.INTERCOM_TOKEN).to.equal("fill-in-token");
  });
});

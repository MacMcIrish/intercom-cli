const expect = require('chai').expect;
const index = require('./../lib/index');
const intercomCLI = require('./../intercom-cli');

describe("Testing Index", () => {
  it("Testing Exported", () => {
    expect(index instanceof Object).to.equal(true);
  });

  it("Testing Intercom CLI", () => {
    expect(intercomCLI instanceof Object).to.equal(true);
  });
});

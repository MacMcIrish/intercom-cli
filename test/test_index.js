const expect = require('chai').expect;
const index = require('./../lib/index');

describe("Testing Index", () => {
  it("Testing Exported", () => {
    expect(index instanceof Object).to.equal(true);
  });
});

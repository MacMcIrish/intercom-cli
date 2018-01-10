const expect = require('chai').expect;
const yargs = require('yargs');
const user = require('./../../lib/cmds/users');

describe("Testing Users", () => {
  it("Testing Builder", () => {
    expect(user.builder(yargs) instanceof Object).to.equal(true);
  });
});

const expect = require('chai').expect;
const yargs = require('yargs');
const csvs = require('./../../lib/cmds/csv');

describe("Testing Csvs", () => {
  it("Testing Builder", () => {
    expect(csvs.builder(yargs) instanceof Object).to.equal(true);
  });
});

const fs = require('fs');
const expect = require('chai').expect;
const tmp = require('tmp');
const loadFileEntries = require('./../../lib/util/misc').loadFileEntries;

describe("Testing Misc", () => {
  it("Testing Load File Entries", () => {
    const tmpFile = tmp.fileSync();
    fs.appendFileSync(tmpFile.name, 'foo\nbar\n\nbaz');
    expect(loadFileEntries(tmpFile.name)).to.deep.equal(["foo", "bar", "baz"]);
    tmpFile.removeCallback();
  });
});

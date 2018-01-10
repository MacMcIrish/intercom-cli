const fs = require('fs');
const expect = require('chai').expect;
const tmp = require('tmp');
const { loadFileEntries, ensureDirExists } = require('./../../lib/util/misc');

describe("Testing Misc", () => {
  it("Testing Load File Entries", () => {
    const tmpFile = tmp.fileSync();
    fs.appendFileSync(tmpFile.name, 'foo\nbar\n\nbaz');
    expect(loadFileEntries(tmpFile.name)).to.deep.equal(["foo", "bar", "baz"]);
    tmpFile.removeCallback();
  });

  it("Testing Ensure Dir Exists", () => {
    const tmpDir = tmp.dirSync();
    const tmpSubDir = `${tmpDir.name}/sub`;
    expect(fs.existsSync(tmpSubDir)).to.equal(false);
    ensureDirExists(tmpSubDir);
    expect(fs.existsSync(tmpSubDir)).to.equal(true);
    fs.rmdirSync(tmpSubDir);
    tmpDir.removeCallback();
  });
});

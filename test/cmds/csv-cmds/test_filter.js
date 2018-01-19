const expect = require('chai').expect;
const path = require('path');
const fs = require('fs');
const tmp = require('tmp');
const filter = require('./../../../lib/cmds/csv-cmds/filter');

describe("Testing Filtering CSV content", () => {
  let tmpFileIn;
  let tmpFileFilter;
  let tmpFileOut;

  beforeEach(() => {
    tmpFileIn = tmp.fileSync();
    tmpFileFilter = tmp.fileSync();
    tmpFileOut = tmp.fileSync();
  });

  afterEach(() => {
    tmpFileIn.removeCallback();
    tmpFileFilter.removeCallback();
    tmpFileOut.removeCallback();
  });

  it("Testing Filtering", (done) => {
    fs.writeFileSync(tmpFileIn.name, 'user_id,name\n0123,ABC\n4567,DEF\n');
    fs.writeFileSync(tmpFileFilter.name, 'user_id,name\n9876,GHI\n4567,JKL\n');
    filter.handler({
      fileIn: path.basename(tmpFileIn.name),
      fileFilter: path.basename(tmpFileFilter.name),
      fileOut: path.basename(tmpFileOut.name),
      key: 'user_id',
      dir: path.dirname(tmpFileOut.name)
    })
      .then(() => {
        expect(fs.readFileSync(tmpFileOut.name, "utf8")).to.deep.equal('user_id,name\n4567,DEF\n');
        done();
      });
  });
});

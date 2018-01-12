const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const tmp = require('tmp');
const extractDuplicates = require('./../../../lib/cmds/users-cmds/extract-duplicates');
const csv = require('./../../../lib/util/csv');

describe("Testing Extract Duplicates", () => {
  let tmpFile1;
  let tmpFile2;

  beforeEach(() => {
    tmpFile1 = tmp.fileSync();
    tmpFile2 = tmp.fileSync();
  });

  afterEach(() => {
    tmpFile1.removeCallback();
    tmpFile2.removeCallback();
  });

  it("Testing Extract Duplicates", (done) => {
    fs.writeFileSync(tmpFile1.name, 'id,user_id,name\n1,1,foo\n2,2,bar\n1,,baz');
    extractDuplicates.handler({
      fileIn: path.basename(tmpFile1.name),
      fileOut: path.basename(tmpFile2.name),
      dir: path.dirname(tmpFile2.name)
    }).then(duplicateCount => csv.read(tmpFile2.name).then((result) => {
      expect(duplicateCount).to.equal(1);
      expect(result.length).to.equal(1);
      expect(result[0]).to.deep.equal({
        id: '1',
        user_id: '1',
        name: 'foo'
      });
      done();
    }));
  });

  it("Testing Extract Duplicates No Result", (done) => {
    fs.writeFileSync(tmpFile1.name, 'id,user_id,name\n1,1,foo\n2,2,bar');
    extractDuplicates.handler({
      fileIn: path.basename(tmpFile1.name),
      fileOut: path.basename(tmpFile2.name),
      dir: path.dirname(tmpFile2.name)
    }).then((result) => {
      expect(fs.readFileSync(tmpFile2.name, 'utf8')).to.equal('');
      expect(result).to.equal(0);
      done();
    });
  });
});

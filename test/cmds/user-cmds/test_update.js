const path = require('path');
const fs = require('fs');
const nockBack = require('nock').back;
const tmp = require('tmp');
const update = require('./../../../lib/cmds/user-cmds/update');

describe("Testing Users Update", () => {
  let tmpFile;
  before(() => {
    nockBack.setMode("record");
    nockBack.fixtures = path.join(__dirname, "__cassette");
  });

  beforeEach(() => {
    tmpFile = tmp.fileSync();
  });

  afterEach(() => {
    tmpFile.removeCallback();
  });

  it("Testing Update from CSV", (done) => {
    fs.writeFileSync(tmpFile.name, 'id,user_id,name\n0123,0123,Test 1\n4567,4567,Test 2');
    nockBack('intercom-bulk-update-users.json', {}, (nockDone) => {
      update.handler({
        file: path.basename(tmpFile.name),
        dir: path.dirname(tmpFile.name)
      })
        .then(() => {
          done();
          nockDone();
        });
    });
  });
});

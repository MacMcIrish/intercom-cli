const path = require('path');
const fs = require('fs');
const nockBack = require('nock').back;
const tmp = require('tmp');
const deleteUsers = require('./../../../lib/cmds/user-cmds/delete');

describe("Testing Users Delete", () => {
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

  it("Testing Delete from CSV", (done) => {
    fs.writeFileSync(tmpFile.name, 'user_id,name\n0123,Test 1\n4567,Test 2');
    nockBack('intercom-bulk-delete-users.json', {}, (nockDone) => {
      deleteUsers.handler({
        file: path.basename(tmpFile.name),
        key: 'user_id',
        dir: path.dirname(tmpFile.name)
      })
        .then(() => {
          done();
          nockDone();
        });
    });
  });
});

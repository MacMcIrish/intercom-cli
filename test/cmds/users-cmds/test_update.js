const path = require('path');
const fs = require('fs');
const nockBack = require('nock').back;
const tmp = require('tmp');
const update = require('./../../../lib/cmds/users-cmds/update');

describe("Testing Users Update", () => {
  before(() => {
    nockBack.setMode("record");
    nockBack.fixtures = path.join(__dirname, "__cassette");
  });

  it("Testing Update from CSV", (done) => {
    const tmpFile = tmp.fileSync();
    fs.writeFileSync(tmpFile.name, 'user_id,name\n0123,Test 1\n4567,Test 2');
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

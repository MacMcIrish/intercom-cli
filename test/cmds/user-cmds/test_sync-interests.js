const fs = require('fs');
const path = require('path');
const nockBack = require('nock').back;
const tmp = require('tmp');
const syncInterests = require('./../../../lib/cmds/user-cmds/sync-interests');

describe("Testing Sync Interests", () => {
  let tmpFile1;

  beforeEach(() => {
    tmpFile1 = tmp.fileSync();
    nockBack.setMode("record");
    nockBack.fixtures = path.join(__dirname, "__cassette");
  });

  afterEach(() => {
    tmpFile1.removeCallback();
  });

  it("Testing Different Cases", (done) => {
    fs.writeFileSync(tmpFile1.name, 'user_id,interests\n' +
      '01234567890123456789012345678901,"Golf,Fishing,Ball"\n' +
      '98765432109876543210987654321098,"Water,Fishing,Writing"\n');
    nockBack('intercom-users-sync-interests.json', {}, (nockDone) => {
      syncInterests.handler({
        file: path.basename(tmpFile1.name),
        dir: path.dirname(tmpFile1.name)
      }).then((result) => {
        nockDone();
        done();
      });
    });
  });

  it("Testing User Not Found", (done) => {
    fs.writeFileSync(tmpFile1.name, 'user_id,interests\n' +
      '01234567890123456789012345678901,"Golf,Fishing,Ball"\n');
    nockBack('intercom-users-sync-interests-not-found.json', {}, (nockDone) => {
      syncInterests.handler({
        file: path.basename(tmpFile1.name),
        dir: path.dirname(tmpFile1.name)
      }).then((result) => {
        nockDone();
        done();
      });
    });
  });
});

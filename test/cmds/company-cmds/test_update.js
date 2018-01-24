const path = require('path');
const fs = require('fs');
const nockBack = require('nock').back;
const tmp = require('tmp');
const update = require('./../../../lib/cmds/company-cmds/update');

describe("Testing Companies Update CMD", () => {
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
    fs.writeFileSync(tmpFile.name, 'company_id,name,enabled,expiration_at\n0123,company1,true,\n4567,company2,false,');
    nockBack('intercom-bulk-company-update.json', {}, (nockDone) => {
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

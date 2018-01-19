const path = require('path');
const expect = require("chai").expect;
const nockBack = require('nock').back;
const tmp = require('tmp');
const fetch = require('./../../../lib/cmds/user-cmds/fetch');
const loadFileEntries = require('./../../../lib/util/misc').loadFileEntries;

describe("Testing Users Fetch", () => {
  before(() => {
    nockBack.setMode('record');
    nockBack.fixtures = path.join(__dirname, "__cassette");
  });

  it("Testing Write to CSV", (done) => {
    const tmpFile = tmp.fileSync();
    nockBack(`intercom-users-scroll.json`, {}, (nockDone) => {
      fetch.handler({
        file: path.basename(tmpFile.name),
        dir: path.dirname(tmpFile.name)
      })
        .then(() => {
          const entries = loadFileEntries(tmpFile.name);
          expect(entries.length).to.equal(2);
          expect(entries[0]).to.contain(",name,");
          expect(entries[1]).to.contain(",First Last,");
          nockDone();
          done();
        });
    });
  });
});

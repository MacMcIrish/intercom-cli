const path = require('path');
const expect = require("chai").expect;
const nockBack = require('nock').back;
const intercom = require('./../../lib/util/intercom')({
  INTERCOM_TOKEN: 'test-token'
});

describe("Testing Intercom Users", () => {
  before(() => {
    nockBack.setMode('record');
    nockBack.fixtures = path.join(__dirname, "__cassette");
  });

  // eslint-disable-next-line func-names
  it("Testing User Scrolling", function (done) {
    this.timeout(60000);
    nockBack(`intercom-users-scroll.json`, {}, (nockDone) => {
      intercom.users.scroll((r) => {
        if (r !== null) {
          expect(r.body.users.length).to.be.at.most(100);
        } else {
          nockDone();
          done();
        }
        return Promise.resolve();
      });
    });
  });

  it("Testing User Updating", done => nockBack('intercom-users-update.json', {}, nockDone => intercom.users
    .update({ user_id: '00000000000000000000000000000000', name: 'First Last' })
    .then((result) => {
      expect(result.statusCode).to.equal(200);
      expect(result.body.name).to.equal('First Last');
      nockDone();
      done();
    })));

  it("Testing Bulk User Updating", done => nockBack('intercom-users-bulk-update.json', {}, nockDone => intercom
    .bulk(intercom.users.update, [
      { email: 'email@email.com', name: 'First Last', user_id: '00000000000000000000000000000000' },
      { email: 'email@email.com', name: 'First Last', user_id: '00000000000000000000000000000000' },
      { email: 'email@email.com', name: 'First Last', user_id: '00000000000000000000000000000000' },
      { email: 'email@email.com', name: 'First Last', user_id: '00000000000000000000000000000000' }
    ])
    .then(() => {
      done();
      nockDone();
    })));

  it("Testing User Deleting", done => nockBack('intercom-users-delete.json', {}, nockDone => intercom.users
    .delete({ user_id: "00000000000000000000000000000000" })
    .then((result) => {
      expect(result.statusCode).to.equal(200);
      done();
      nockDone();
    })));
});

describe("Testing Intercom Companies", () => {
  before(() => {
    nockBack.setMode('record');
    nockBack.fixtures = path.join(__dirname, "__cassette");
  });

  it("Testing Update Company", done => nockBack('intercom-company-update.json', {}, nockDone => intercom.companies
    .update({ company_id: "0", custom_attributes: { enabled: "false" } })
    .then((result) => {
      expect(result.statusCode).to.equal(200);
      expect(result.body.custom_attributes.enabled).to.equal(false);
      done();
      nockDone();
    })));
});

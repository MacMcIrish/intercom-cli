const fs = require('fs');
const expect = require("chai").expect;
const csv = require('./../../lib/util/csv');
const tmp = require('tmp');

describe("Testing CSV", () => {
  let csvUtil;
  let tmpobj;

  beforeEach(() => {
    tmpobj = tmp.fileSync();
    csvUtil = csv.write(tmpobj.name, ["foo"]);
  });

  afterEach(() => {
    csvUtil.close();
    tmpobj.removeCallback();
  });

  it("Testing Writing", (done) => {
    csvUtil.append({ foo: 'object' });
    csvUtil.append(['array']);
    csvUtil.close().then(() => {
      expect(fs.existsSync(tmpobj.name)).to.equal(true);
      expect(fs.readFileSync(tmpobj.name, 'utf8')).to.equal('foo\nobject\narray\n');
      done();
    });
  });

  it("Testing Invalid Header", () => {
    expect(csvUtil.append.bind(csvUtil, ({ bar: "baz" }))).to.throw('Mismatching headers.');
  });

  it("Testing Writing Array Invalid Columns", () => {
    expect(csvUtil.append.bind(csvUtil, ['test1', 'test2'])).to.throw('Incorrect column number passed.');
  });

  it("Testing Writing Invalid Param Type", () => {
    expect(csvUtil.append.bind(csvUtil, 'test')).to.throw('Data must be instance of Array or Object.');
  });

  it("Testing Reading Users from CSV", (done) => {
    fs.writeFileSync(tmpobj.name, 'id,name\nfoo,bar\nbaz,qux');
    csv.read(tmpobj.name).then((users) => {
      expect(users).to.deep.equal([{
        id: 'foo',
        name: 'bar'
      }, {
        id: 'baz',
        name: 'qux'
      }]);
      done();
    });
  });

  it("Testing Reading CSV Error", (done) => {
    fs.writeFileSync(tmpobj.name, 'id,name\nfoo,,bar\nbaz,qux');
    csv.read(tmpobj.name).catch((err) => {
      expect(err.message).to.equal("Number of columns is inconsistent on line 2");
      done();
    });
  });
});

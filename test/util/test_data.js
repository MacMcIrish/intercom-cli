const expect = require('chai').expect;
const findDuplicates = require('./../../lib/util/data').findDuplicates;

describe("Testing Data", () => {
  it("Testing Find Duplicates (3)", () => {
    const data = [{
      id: 1,
      data: 2
    }, {
      id: 1,
      data: 3
    }, {
      id: 1,
      data: 1
    }];
    const duplicates = findDuplicates(data, ['id']);
    expect(duplicates.length).to.equal(3);
    expect(duplicates).to.deep.contain({ id: 1, data: 1 });
    expect(duplicates).to.deep.contain({ id: 1, data: 2 });
    expect(duplicates).to.deep.contain({ id: 1, data: 3 });
  });

  it("Testing Find Duplicates (2)", () => {
    const data = [{
      id: 1,
      data: 2
    }, {
      id: 2,
      data: 2
    }, {
      id: 1,
      data: 1
    }];
    const duplicates = findDuplicates(data, ['id']);
    expect(duplicates.length).to.equal(2);
    expect(duplicates).to.deep.contain({ id: 1, data: 1 });
    expect(duplicates).to.deep.contain({ id: 1, data: 2 });
  });
});

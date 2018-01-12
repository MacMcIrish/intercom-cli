const expect = require('chai').expect;
const { sort, findDuplicates, merge } = require('./../../lib/util/data');

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

  it("Testing Sort Empty String First", () => {
    const data = [{
      user_id: ''
    }, {
      user_id: '1'
    }];
    const sorted = sort(data, ['user_id']);
    expect(sorted).to.deep.equal([{ user_id: '' }, { user_id: '1' }]);
  });

  it("Testing Merge Order", () => {
    const data = [{
      id: 1,
      user_id: ''
    }, {
      id: 1,
      user_id: '1'
    }];
    const merged = merge(data, 'id');
    expect(merged).to.deep.equal([{ id: 1, user_id: '1' }]);
  });
});

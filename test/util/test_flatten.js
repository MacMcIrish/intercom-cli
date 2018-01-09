const expect = require('chai').expect;
const flatten = require('./../../lib/util/flatten');

describe("Testing Flatten", () => {
  it("Testing Flatten", () => {
    expect(flatten({ a: { b: { c: 'str', d: ['array'] } } })).to.deep.equal({ 'a.b.c': 'str', 'a.b.d': '["array"]' });
  });
});

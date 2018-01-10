const expect = require('chai').expect;
const flatten = require('./../../lib/util/flatten');

describe("Testing Flatten", () => {
  it("Testing Simple Flatten", () => {
    expect(flatten({ a: { b: { c: 'str', d: ['array'] } } })).to.deep.equal({ 'a.b.c': 'str', 'a.b.d': '["array"]' });
  });

  it("Testing Object Array", () => {
    expect(flatten({ a: [{ b: 'c' }] })).to.deep.equal({ a: '[{"b":"c"}]' });
  });
});

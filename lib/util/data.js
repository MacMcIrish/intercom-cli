const get = require('lodash.get');

const cmp = (a, b, fields) => get(fields.map((field) => {
  if (a[field] > b[field]) {
    return 1;
  } else if (a[field] < b[field]) {
    return -1;
  }
  return 0;
}).filter(result => result !== 0), '0', 0);

module.exports.sort = (data, fields) => data.slice().sort((a, b) => cmp(a, b, fields));

module.exports.findDuplicates = (data, fields) => {
  const sortedData = this.sort(data, fields);
  const breaks = [0, ...sortedData
    .map((e, idx) => (cmp(e, get(sortedData, (idx + 1).toString(), e), fields) === 0 ? null : idx + 1))
    .filter(e => e !== null), sortedData.length];
  const result = [];
  for (let idx = 0; idx < breaks.length - 1; idx += 1) {
    if (breaks[idx] !== breaks[idx + 1] - 1) {
      result.push(...sortedData.splice(breaks[idx], breaks[idx + 1]));
    }
  }
  return result;
};

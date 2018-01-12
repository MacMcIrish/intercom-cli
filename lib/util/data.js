const get = require('lodash.get');

const cmp = (a, b, fields) => get(fields.map((field) => {
  if (a[field] > b[field]) {
    return 1;
  } else if (a[field] < b[field]) {
    return -1;
  }
  return 0;
}).filter(result => result !== 0), '0', 0);

module.exports.findDuplicates = (data, fields) => {
  const sortedData = data.slice().sort((a, b) => cmp(a, b, fields));
  const duplicates = [];
  for (let idx = 0; idx < sortedData.length - 1; idx += 1) {
    let found = false;
    let next = idx + 1;
    while (next < sortedData.length && cmp(sortedData[idx], sortedData[next], fields) === 0) {
      if (!found) {
        duplicates.push(sortedData[idx]);
        found = true;
      }
      duplicates.push(sortedData[next]);
      next += 1;
    }
    if (found) {
      idx = next;
    }
  }
  return duplicates;
};

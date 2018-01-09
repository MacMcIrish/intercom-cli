const fs = require('fs');
const xor = require('lodash.xor');
const csvWriter = require('csv-write-stream');

module.exports = (fileName, headers) => {
  const writer = csvWriter({ headers });
  const stream = fs.createWriteStream(fileName);
  writer.pipe(stream);
  return {
    append: (data) => {
      if (data instanceof Array) {
        if (data.length !== headers.length) {
          throw new Error("Incorrect column number passed.");
        }
      } else if (data instanceof Object) {
        if (xor(Object.keys(data), headers).length !== 0) {
          throw new Error('Mismatching headers.');
        }
      } else {
        throw new Error('Data must be instance of Array or Object.');
      }
      writer.write((data instanceof Array)
        ? headers.reduce((obj, key, idx) => Object.assign(obj, { [key]: data[idx] }), {})
        : data);
    },
    close: () => {
      writer.end();
      return new Promise(resolve => stream.on('close', resolve));
    }
  };
};

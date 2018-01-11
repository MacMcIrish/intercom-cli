const fs = require('fs');
const xor = require('lodash.xor');
const csvWriter = require('csv-write-stream');
const csvParse = require('csv-parse');

module.exports.write = (fileName, headers) => {
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

// Expects headers to be present, returns list of Objects
module.exports.read = filepath => new Promise((resolve, reject) => csvParse(
  fs.readFileSync(filepath, 'utf8'),
  (err, result) => (err
    ? reject(err)
    : resolve(result.splice(1).map(entry => result[0]
      .reduce((obj, key, idx) => Object.assign(obj, { [key]: entry[idx] }), {}))))
));

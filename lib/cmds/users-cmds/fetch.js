const get = require('lodash.get');
const config = require('./../../util/config');
const csv = require('./../../util/csv');
const flatten = require('./../../util/flatten');
const intercom = require('./../../util/intercom')(config);
const { loadFileEntries, ensureDirExists } = require('./../../util/misc');

const writeToCSV = (file) => {
  const userFields = loadFileEntries(`${__dirname}/fields.txt`);
  const dir = ensureDirExists(`${__dirname}/../../../out`);
  const csvUtil = csv(`${dir}/${file}`, userFields);
  intercom.users.scroll((r) => {
    if (r !== null) {
      r.body.users.forEach((user) => {
        const flattenedUser = flatten(user); // Declared as variable to prevent reprocessing
        csvUtil.append(userFields
          .reduce((obj, key) => Object.assign(obj, { [key]: get(flattenedUser, key, null) }), {}));
      });
    } else {
      csvUtil.close();
    }
    return Promise.resolve();
  });
};

exports.command = 'fetch <file>';
exports.desc = 'download users from intercom to csv at <file>';
exports.builder = {};
exports.handler = argv => writeToCSV(argv.file);

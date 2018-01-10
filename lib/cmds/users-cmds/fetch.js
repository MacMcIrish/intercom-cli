const fs = require('fs');
const get = require('lodash.get');
const config = require('./../../util/config');
const csv = require('./../../util/csv');
const flatten = require('./../../util/flatten');
const intercom = require('./../../util/intercom')(config);
const loadFileLines = require('./../../util/misc').loadFileEntries;

const writeToCSV = (file) => {
  const userFields = loadFileLines(`${__dirname}/fields.txt`);
  const dir = `${__dirname}/../../../out`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const csvUtil = csv(`${dir}/${file}`, userFields);
  intercom.users.scroll((r, completed) => {
    r.body.users.forEach((user) => {
      const flattenedUser = flatten(user);
      csvUtil.append(userFields.reduce((obj, key) => Object.assign(obj, { [key]: get(flattenedUser, key, null) }), {}));
    });
    if (completed) {
      csvUtil.close();
    }
    return Promise.resolve();
  });
};

exports.command = 'fetch <file>';
exports.desc = 'download users from intercom to csv at <file>';
exports.builder = {};
exports.handler = argv => writeToCSV(argv.file);

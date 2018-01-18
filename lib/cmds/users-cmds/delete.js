const csv = require('./../../util/csv');
const config = require('./../../util/config');
const intercom = require('./../../util/intercom')(config);

const deleteUsers = (file, key, dir = `${__dirname}/../../../out`) => csv
  .read(`${dir}/${file}`)
  .then(dataList => intercom.users.bulk(
    data => intercom.users.delete({ [key]: data[key] }),
    dataList
  ));

exports.command = 'delete <file> <key>';
exports.desc = 'delete users from intercom in csv at <file> by <key>';
exports.builder = {};
exports.handler = argv => deleteUsers(argv.file, argv.key, argv.dir);

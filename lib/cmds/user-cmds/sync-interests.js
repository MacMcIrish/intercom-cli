const config = require('./../../util/config');
const csv = require('./../../util/csv');
const intercom = require('./../../util/intercom')(config);

const syncInterests = (file, dir = `${__dirname}/../../../out`) => csv
  .read(`${dir}/${file}`)
  .then(data => intercom.users.bulk(intercom.users.syncInterests, data));

exports.command = 'sync-interests <file>';
exports.desc = 'Sync interests for users stored in <file>';
exports.builder = {};
exports.handler = argv => syncInterests(argv.file, argv.dir);

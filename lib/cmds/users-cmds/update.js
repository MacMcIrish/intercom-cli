const csv = require('./../../util/csv');
const config = require('./../../util/config');
const intercom = require('./../../util/intercom')(config);
const log = require("./../../util/log");

const updateUsers = (file, dir = `${__dirname}/../../../out`) => new Promise(resolve => csv
  .read(`${dir}/${file}`)
  .then((dataList) => {
    let count = 0;
    return intercom.users.bulk((data) => {
      count += 1;
      if (count % 20 === 1) {
        log.info(`Processing ${count} / ${dataList.length}`);
      }
      return intercom.users.update(data);
    }, dataList);
  }).then(resolve));

exports.command = 'update <file>';
exports.desc = 'update intercom users in csv at <file>';
exports.builder = {};
exports.handler = argv => updateUsers(argv.file, argv.dir);

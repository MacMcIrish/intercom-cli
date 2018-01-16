const csv = require('./../../util/csv');
const config = require('./../../util/config');
const intercom = require('./../../util/intercom')(config);
const log = require("./../../util/log");

const deleteUsers = (file, key, dir = `${__dirname}/../../../out`) => csv
  .read(`${dir}/${file}`)
  .then((dataList) => {
    let count = 0;
    return intercom.users.bulk((data) => {
      count += 1;
      if (count % 20 === 1) {
        log.info(`Processing ${count} / ${dataList.length}`);
      }
      return intercom.users.delete({ [key]: data[key] });
    }, dataList);
  });

exports.command = 'delete <file> <key>';
exports.desc = 'delete users from intercom in csv at <file> by <key>';
exports.builder = {};
exports.handler = argv => deleteUsers(argv.file, argv.key, argv.dir);

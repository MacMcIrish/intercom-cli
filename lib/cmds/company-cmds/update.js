const pick = require('lodash.pick');
const csv = require('./../../util/csv');
const config = require('./../../util/config');
const intercom = require('./../../util/intercom')(config);

const updateUsers = (file, dir = `${__dirname}/../../../out`) => csv
  .read(`${dir}/${file}`)
  .then(dataList => intercom.bulk(
    data => intercom.companies.update(Object.assign(
      {
        custom_attributes: pick(data, ["enabled", "expiration_at"])
      },
      pick(data, ["company_id"].filter(e => data[e] !== ''))
    )),
    dataList
  ));

exports.command = 'update <file>';
exports.desc = 'update intercom companies in csv at <file>';
exports.builder = {};
exports.handler = argv => updateUsers(argv.file, argv.dir);

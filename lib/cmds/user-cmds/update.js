const pick = require('lodash.pick');
const csv = require('./../../util/csv');
const config = require('./../../util/config');
const intercom = require('./../../util/intercom')(config);

const updateUsers = (file, dir = `${__dirname}/../../../out`) => csv
  .read(`${dir}/${file}`)
  .then(dataList => intercom.users.bulk(
    data => intercom.users.update(Object.assign(
      {
        custom_attributes: pick(data, ["platform", "email_notifications_enabled", "ios_location_type",
          "ios_location_enabled", "ios_push_notifications_enabled", "ios_app_version", "is_admin", "is_manager",
          "is_member", "is_linked_to_facebook", "market_name", "job_title", "intercom_id",
          "location_enabled", "location", "age", "first_name", "last_name", "age_range", "role"]
          .filter(e => data[e] !== ''))
      },
      pick(data, ["id", "user_id", "email", "name"].filter(e => data[e] !== ''))
    )),
    dataList
  ));

exports.command = 'update <file>';
exports.desc = 'update intercom users in csv at <file>';
exports.builder = {};
exports.handler = argv => updateUsers(argv.file, argv.dir);

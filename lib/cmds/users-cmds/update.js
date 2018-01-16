const pick = require('lodash.pick');
const csv = require('./../../util/csv');
const config = require('./../../util/config');
const intercom = require('./../../util/intercom')(config);
const log = require("./../../util/log");

const updateUsers = (file, dir = `${__dirname}/../../../out`) => csv
  .read(`${dir}/${file}`)
  .then((dataList) => {
    let count = 0;
    return intercom.users.bulk((data) => {
      count += 1;
      if (count % 20 === 1) {
        log.info(`Processing ${count} / ${dataList.length}`);
      }
      const mappedAttributes = Object.assign(
        {
          id: data.id,
          user_id: data.id,
          custom_attributes: pick(data, ["platform", "email_notifications_enabled", "ios_location_type",
            "ios_location_enabled", "ios_push_notifications_enabled", "ios_app_version", "is_admin", "is_manager",
            "is_member", "is_linked_to_facebook", "market_name", "job_title", "intercom_id",
            "location_enabled", "location", "age", "first_name", "last_name", "age_range", "role"]
            .filter(e => data[e] !== ''))
        },
        pick(data, ["email", "name"].filter(e => data[e] !== ''))
      );
      return intercom.users.update(mappedAttributes);
    }, dataList);
  });

exports.command = 'update <file>';
exports.desc = 'update intercom users in csv at <file>';
exports.builder = {};
exports.handler = argv => updateUsers(argv.file, argv.dir);

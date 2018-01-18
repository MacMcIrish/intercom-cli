const xor = require("lodash.xor");
const get = require('lodash.get');
const Intercom = require('intercom-client');

// Percentage in [0, 1], maxTimeout is reached when percentage is 1, returns [0, maxTimeout]
// Ref: https://github.com/gotwarlost/istanbul/issues/859
// eslint-disable-next-line no-restricted-properties
const backOff = (percentage, maxTimeout) => Math.pow(percentage, 5) * maxTimeout;

const extractBackOff = (r) => {
  const limit = get(r.headers, "x-ratelimit-limit", 85);
  const remaining = get(r.headers, "x-ratelimit-remaining", 85);
  const curUnix = new Date().getTime();
  const resetUnix = get(r.headers, "x-ratelimit-reset", curUnix + 60000);
  return backOff((limit - remaining) / limit, resetUnix - curUnix);
};

const bulk = (processor, dataList) => dataList
  .reduce((prev, curr) => prev.then(() => new Promise((resolve, reject) => processor(curr)
    .then(r => setTimeout(resolve, extractBackOff(r)))
    .catch(reject))), Promise.resolve());

module.exports = (config) => {
  const client = new Intercom.Client({ token: config.INTERCOM_TOKEN });
  return {
    users: {
      // Calls cb with null if no more entries
      scroll: processor => client.users.scroll.each({}, r => processor(r.body.users.length === 0 ? null : r)),
      update: data => client.users.update(data),
      delete: data => client.users.delete(data),
      syncInterests: data => client.users
        .find({ user_id: data.user_id })
        .then((r) => {
          const targetTags = data.interests.split(",").map(t => `Interest: ${t}`);
          const existingTags = r.body.tags.tags.map(e => e.name).filter(t => t.indexOf("Interest: ") === 0);
          const changedTags = xor(targetTags, existingTags);
          return changedTags
            .map(tag => new Promise(resolve => client
              .tags[targetTags.indexOf(tag) === -1 ? 'untag' : 'tag']({ name: tag, users: [{ user_id: data.user_id }] })
              .then(resolve)))
            .reduce((prev, cur) => prev.then(() => cur), Promise.resolve(r));
        }),
      bulk
    }
  };
};

const get = require('lodash.get');
const Intercom = require('intercom-client');

// Percentage in [0, 1], maxTimeout is reached when percentage is 1, returns [0, maxTimeout]
// eslint-disable-next-line no-restricted-properties
const backOff = (percentage, maxTimeout) => Math.pow(percentage, 5) * maxTimeout;

const apiForEach = (dataList, processor) => new Promise(resolveOuter => dataList
  .reduce((prev, curr) => prev.then(() => new Promise((resolve, reject) => processor(curr).then((r) => {
    const limit = get(r.headers, "x-ratelimit-limit", 85);
    const remaining = get(r.headers, "x-ratelimit-remaining", 85);
    setTimeout(() => resolve(), backOff(
      (limit - remaining) / limit,
      get(r.headers, "x-ratelimit-reset", 60000) - new Date().getTime()
    ));
  }).catch(reject))), Promise.resolve()).then(resolveOuter));

module.exports = (config) => {
  const client = new Intercom.Client({ token: config.INTERCOM_TOKEN });
  return {
    users: {
      // Calls cb with null if no more entries
      scroll: processor => client.users.scroll.each({}, r => processor(r.body.users.length === 0 ? null : r)),
      update: data => client.users.update(data),
      delete: data => client.users.delete(data),
      updateBulk: dataList => apiForEach(dataList, data => client.users.update(data))
    }
  };
};

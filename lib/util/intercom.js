const get = require('lodash.get');
const Intercom = require('intercom-client');
const log = require("./log");

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

const apiForEach = (dataList, processor) => new Promise(resolveOuter => dataList
  .reduce((prev, curr, idx) => prev.then(() => new Promise((resolve, reject) => {
    if (idx % 20 === 0) {
      log.info(`Processing ${idx + 1} / ${dataList.length}`);
    }
    return processor(curr)
      .then(r => setTimeout(resolve, extractBackOff(r)))
      .catch(reject);
  })), Promise.resolve())
  .then(resolveOuter));

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

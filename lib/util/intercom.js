const Intercom = require('intercom-client');

module.exports = (config) => {
  const client = new Intercom.Client({ token: config.INTERCOM_TOKEN });
  return {
    users: {
      // Calls cb with null if no more entries
      scroll: processor => client.users.scroll.each({}, r => processor(r.body.users.length === 0 ? null : r))
    }
  };
};

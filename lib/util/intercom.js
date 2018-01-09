const Intercom = require('intercom-client');

module.exports = (config) => {
  const client = new Intercom.Client({ token: config.INTERCOM_TOKEN });
  return {
    users: {
      // Calls cb with (response, completed [boolean])
      scroll: processor => client.users.scroll.each({}, r => processor(r, r.body.users.length === 0))
    }
  };
};

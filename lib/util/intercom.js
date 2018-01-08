const Intercom = require('intercom-client');

module.exports = (config) => {
  const client = new Intercom.Client({ token: config.INTERCOM_TOKEN });
  return {
    users: {
      scroll: processor => client.users.scroll.each({}, r => processor(r))
    }
  };
};

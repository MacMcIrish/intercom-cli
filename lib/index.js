const Intercom = require('intercom-client');
const config = require('./util/config');

const client = new Intercom.Client({ token: config.INTERCOM_TOKEN });
console.log(config.INTERCOM_TOKEN);
const downloadUsers = () => {
  client.counts.appCounts().then(r => console.log(r));
};

downloadUsers();

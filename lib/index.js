const config = require('./util/config');
const intercom = require('./util/intercom')(config);

intercom.users.scroll((r) => {
  console.log(r.body.users.length);
  return Promise.resolve();
});

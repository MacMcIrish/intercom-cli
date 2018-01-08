const config = require('./util/config');
const intercom = require('./util/intercom')(config);

intercom.users.scroll(r => Promise.resolve());

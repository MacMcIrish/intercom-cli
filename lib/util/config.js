const fs = require('fs');
const get = require('lodash.get');
const yaml = require('js-yaml');

const env = get(process.argv.slice(1), process.argv.indexOf('--env'), 'template');
module.exports = yaml.load(fs.readFileSync(`${__dirname}/../../config/${env}.yml`));

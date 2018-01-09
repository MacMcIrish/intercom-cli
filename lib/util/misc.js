const fs = require('fs');

// Load non-empty lines as array
module.exports.loadFileEntries = (path) => {
  return fs
    .readFileSync(path, 'utf8')
    .split('\n')
    .map(s => s.trim())
    .filter(s => s !== '');
};

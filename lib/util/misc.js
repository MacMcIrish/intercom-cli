const fs = require('fs');

// Load non-empty lines as array
module.exports.loadFileEntries = path => fs
  .readFileSync(path, 'utf8')
  .split('\n')
  .map(s => s.trim())
  .filter(s => s !== '');

// Ensure directory exists
module.exports.ensureDirExists = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  return path;
};

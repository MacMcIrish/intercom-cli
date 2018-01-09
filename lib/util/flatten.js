const flat = require('flat');

module.exports = (input) => {
  const flattened = flat(input, { safe: true });
  return Object.keys(flattened)
    .reduce((obj, key) => Object.assign(obj, {
      [key]: (flattened[key] instanceof Array)
        ? JSON.stringify(flattened[key])
        : flattened[key]
    }), {});
};

const flatten = (input, prefix = []) => {
  const result = {};
  if (input instanceof Object && !(input instanceof Array)) {
    Object.keys(input).forEach((k) => {
      Object.assign(result, flatten(input[k], prefix.concat([k])));
    });
  } else {
    result[prefix.join(".")] = (input instanceof Array) ? JSON.stringify(input) : input;
  }
  return result;
};

module.exports = flatten;

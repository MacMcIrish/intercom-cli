const csv = require('./../../util/csv');

const filter = (fileIn, fileFilter, fileOut, key, dir = `${__dirname}/../../../out`) => csv
  .read(`${dir}/${fileFilter}`)
  .then(filterData => filterData.reduce((prev, next) => Object.assign(prev, { [next[key]]: next }), {}))
  .then(lookup => csv
    .read(`${dir}/${fileIn}`)
    .then(inEntries => inEntries.filter(e => lookup[e[key]] !== undefined)))
  .then(outEntries => csv.write(`${dir}/${fileOut}`, outEntries));

exports.command = 'filter <fileIn> <fileFilter> <fileOut> <key>';
exports.desc = 'write entries from <fileIn> to <fileOut> if at matching <key> value exists in <fileFilter>';
exports.builder = {};
exports.handler = argv => filter(argv.fileIn, argv.fileFilter, argv.fileOut, argv.key, argv.dir);

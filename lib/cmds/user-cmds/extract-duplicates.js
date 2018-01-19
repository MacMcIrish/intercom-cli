const csv = require('./../../util/csv');
const { ensureDirExists } = require('./../../util/misc');
const { sort, findDuplicates, merge } = require('./../../util/data');
const info = require('./../../util/log').info;

const extractDuplicates = (fileIn, fileOut, dir = `${__dirname}/../../../out`) => new Promise(resolve => csv
  .read(`${dir}/${fileIn}`)
  .then((data) => {
    // id is optional and not unique, user_id is optional and unique
    // Reference: https://developers.intercom.com/v2.0/reference#create-or-update-user
    // hence we only consider users with valid intercom id for this de-duplication
    const cleanData = data.filter(entry => entry.id !== '');
    const duplicates = findDuplicates(cleanData, ['id']);
    const merged = merge(sort(duplicates, ['id', 'user_id']), 'id');
    info(`Found ${merged.length} duplicates.`);
    return merged.length === 0 ? resolve(0) : csv
      .write(`${ensureDirExists(dir)}/${fileOut}`, merged)
      .then(() => resolve(merged.length));
  }));

exports.command = 'extract-duplicates <fileIn> <fileOut>';
exports.desc = 'extract duplicates from <fileIn>, merge, and write to <fileOut>';
exports.builder = {};
exports.handler = argv => extractDuplicates(argv.fileIn, argv.fileOut, argv.dir);

exports.command = 'user <command>';
exports.desc = 'Manage users';
exports.builder = yargs => yargs.commandDir('user-cmds');
exports.handler = () => {};

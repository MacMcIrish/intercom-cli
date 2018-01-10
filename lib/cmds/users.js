exports.command = 'users <command>';
exports.desc = 'Manage users';
exports.builder = yargs => yargs.commandDir('users-cmds');
exports.handler = () => {};

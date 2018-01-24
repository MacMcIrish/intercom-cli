exports.command = 'companies <command>';
exports.desc = 'Manage companies';
exports.builder = yargs => yargs.commandDir('company-cmds');
exports.handler = () => {};

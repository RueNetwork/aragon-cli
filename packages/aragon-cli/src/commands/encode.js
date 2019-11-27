const callCommand = require('./encode_cmds/call')

exports.builder = function(yargs) {
  return yargs.commandDir('encode_cmds')
}

exports.command = 'encode <command>'
exports.describe = 'Encode evm scripts'
exports.handler = callCommand.handler

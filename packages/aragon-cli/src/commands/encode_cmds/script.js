const { encodeCallScript } = require('@aragon/test-helpers/evmScript')

exports.command = 'script [targets..] [calls..]'

exports.describe = 'Encode multiple calls in an evm script'

exports.builder = yargs => {
  return yargs
    .option('targets', {
      describe: 'Contract address for each call',
      array: true,
      default: [],
    })
    .option('calls', {
      describe: 'Calls to encode',
      array: true,
      default: [],
    })
}

exports.handler = async function({ targets, calls }) {
  if (targets.length !== calls.length) {
    throw new Error('Num targets must match num calls')
  }

  const actions = []
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i]
    const call = calls[i]

    const action = {
      to: target,
      calldata: call,
    }

    actions.push(action)
  }

  const script = encodeCallScript(actions)
  console.log(script)

  process.exit(0)
}

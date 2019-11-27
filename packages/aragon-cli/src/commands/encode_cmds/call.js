exports.command = 'call [option]'

exports.describe = 'Encode a call to a contract'

exports.builder = yargs => {
  return yargs.positional('option', {
    describe: 'Option description',
  })
}

exports.handler = async function({ option }) {
  console.log(`call ${option}`)

  process.exit(0)
}

exports.command = 'script [option]'

exports.describe = 'Encode calls in an evm script'

exports.builder = yargs => {
  return yargs.option('option', {
    describe: 'Option description',
  })
}

exports.handler = async function({ option }) {
  console.log(`script ${option}`)

  process.exit(0)
}

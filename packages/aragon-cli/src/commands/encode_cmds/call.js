const fs = require('fs')
const { ensureWeb3 } = require('../../helpers/web3-fallback')

exports.command = 'call <contractArtifacts> <functionName> <functionArgs..>'

exports.describe = 'Encode a call to a function of a contract'

exports.builder = yargs => {
  return yargs
    .positional('contractArtifacts', {
      describe: 'Path to the JSON contract artifacts containing its ABI',
    })
    .positional('functionName', {
      describe: 'Name of the function to call',
    })
    .positional('functionArgs', {
      description: 'Arguments to be passed to the function',
      array: true,
      default: [],
    })
}

exports.handler = async function({
  network,
  contractArtifacts,
  functionName,
  functionArgs,
}) {
  const web3 = await ensureWeb3(network)

  const file = fs.readFileSync(contractArtifacts, 'utf8')
  const artifacts = JSON.parse(file)

  const Contract = new web3.eth.Contract(artifacts.abi)
  const call = Contract.methods[functionName](...functionArgs).encodeABI()
  console.log(call)

  process.exit(0)
}

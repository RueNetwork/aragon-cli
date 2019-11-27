const fs = require('fs')
const { ensureWeb3 } = require('../helpers/web3-fallback')

exports.command =
  'read <contractArtifacts> <contractAddress> <functionName> [functionArgs..]'

exports.describe = 'Perform a non state changing call to a contract'

exports.builder = yargs => {
  return yargs
    .positional('contractArtifacts', {
      describe: 'Path to the JSON contract artifacts containing its ABI',
    })
    .positional('contractAddress', {
      describe: 'Deployed contract address',
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
  contractAddress,
  functionName,
  functionArgs,
}) {
  const web3 = await ensureWeb3(network)

  const file = fs.readFileSync(contractArtifacts, 'utf8')
  const artifacts = JSON.parse(file)

  const contract = new web3.eth.Contract(artifacts.abi, contractAddress)

  const call = await contract.methods[functionName](...functionArgs).call()
  console.log(call)

  process.exit(0)
}

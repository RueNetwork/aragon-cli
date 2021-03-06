import test from 'ava'
import { propagateFiles } from '../../src/ipfs'

test('Get IPFS readme merkle DAG and CIDs', async t => {
  const ipfsGateway = 'https://ipfs.eth.aragon.network/ipfs'
  const readmeDirCid = 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG'

  const results = await propagateFiles([readmeDirCid], {
    gateways: [ipfsGateway],
  })

  t.deepEqual(results, {
    errors: [],
    failed: 0,
    gateways: [ipfsGateway],
    succeeded: 1,
  })
})

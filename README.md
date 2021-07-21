## How to setup local blockchain for development:

1. Install ganache and run server on port 7545
2. Run `yarn install` in root directory to install truffle
3. Run `yarn install` in `client` directory to install react front-end dependencies
4. Write smart contracts in `contracts` directory
5. Add new smart contracts to `migrations/2_deploy_contracts.js` file
6. Run `yarn truffle compile` to compile smart contracts
7. Run `yarn truffle test` to execute smart contract tests in `test` directory
8. Run `yarn truffle migrate --reset` to deploy contracts to blockchain
9. Add the following network to metamask in order to connect to local blockchain:
```
Network name: http://127.0.0.1:7545
New RPC URL: http://127.0.0.1:7545
Chain ID: 1337
```
10. Add smart contract ABI (JSON) file location to the `client/src/smartContract.js`

export const Contracts = {
  Adoption: 'Adoption.json',
  SimpleStorage: 'SimpleStorage.json',
};

class SmartContract {
  constructor() {
    this.web3Provider = null;
    this.web3 = null;
    this.contracts = {};
  }

  async initWeb3() {
    if(window.ethereum) { // modern dapp browsers
      this.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch(error) {
        // User denied account access
        console.error("User denied account access");
      }
    } else if(window.web3) { // legacy dapp browsers
      this.web3Provider = window.web3.currentProvider;
    } else { // if no injected web3 instance is detected, fall back to Ganache
      this.web3Provider = new window.Web3.providers.HttpProvider('http://localhost:7545')
    }
    this.web3 = new window.Web3(this.web3Provider);

    await this.initContract();
  }

  async initContract() {
    for(const key in Contracts) {
      const fileName = Contracts[key];
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      const response = await fetch(`contracts/${fileName}`);
      const data = await response.json();
      this.contracts[fileName] = window.TruffleContract(data);

      // Set the provider for our contract
      this.contracts[fileName].setProvider(this.web3Provider);
    }
  }

  async getAccount() {
    return new Promise((resolve, reject) => {
      this.web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          reject(error);
        }
        const account = accounts[0];
        resolve(account);
      });
    });
  }

  async getContract(fileName) {
    return this.contracts[fileName].deployed();
  }
}

export default SmartContract;

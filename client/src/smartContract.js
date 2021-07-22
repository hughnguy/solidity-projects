import Web3 from "web3";

const NetworkID = 5777;

export const Contracts = {
  Adoption: 'Adoption.json',
  SimpleStorage: 'SimpleStorage.json',
  ERC20Wallet: 'ERC20Wallet.json',
  HughCoin: 'HughCoin.json'
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
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    this.web3 = new Web3(this.web3Provider);

    await this.initContracts();
  }

  /**
   * Initialize contracts
   */
  async initContracts() {
    for(const key in Contracts) {
      const fileName = Contracts[key];

      // Get the necessary contract artifact file and instantiate it
      const response = await fetch(`contracts/${fileName}`);
      const data = await response.json();
      const applicationBinaryInterface = data.abi;
      const contractAddress = data.networks[NetworkID].address;
      this.contracts[fileName] = new this.web3.eth.Contract(applicationBinaryInterface, contractAddress)

      // Set the provider for our contract
      this.contracts[fileName].setProvider(this.web3Provider);
    }
  }

  /**
   * Get current account signed in metamask
   */
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

  /**
   * Get the smart contract methods
   */
  getContract(fileName) {
    return this.contracts[fileName].methods;
  }

  /**
   * Get the smart contract address
   */
  getAddress(fileName) {
    return this.contracts[fileName]._address;
  }

  /**
   * Converts any wei value into ether
   */
  static fromWei(wei) {
    return Web3.utils.fromWei(wei);
  }

  /**
   * Converts any ether value into wei
   */
  static toWei(ether) {
    return Web3.utils.toWei(ether);
  }
}

export default SmartContract;

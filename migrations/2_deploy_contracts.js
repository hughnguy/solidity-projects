var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Adoption = artifacts.require("./Adoption.sol");
var HughCoin = artifacts.require("./HughCoin.sol");
var ERC20Wallet = artifacts.require("./ERC20Wallet.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Adoption);
  deployer.deploy(HughCoin);
  deployer.deploy(ERC20Wallet);
};

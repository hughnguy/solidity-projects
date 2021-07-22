pragma solidity ^0.5.0;

import "./ERC20Interface.sol";

contract ERC20Wallet {
    /*
        Reads ETH balance of the _owner
    */
    function readEthBalance(address _owner) public view returns (uint256 balance) {
        return address(_owner).balance;
    }

    /*
        Reads token balance of the _owner
    */
    function readTokenBalance(address _owner, address _tokenAddress) public view returns (uint256 balance) {
        ERC20Interface token = ERC20Interface(_tokenAddress);
        return token.balanceOf(_owner);
    }
}

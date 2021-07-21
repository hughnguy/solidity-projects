pragma solidity ^0.5.0;

import "./ERC20Interface.sol";

contract HughCoin is ERC20Interface {
    // infinite value
    uint256 constant private MAX_UINT256 = 2**256 - 1;

    // balances[owner] = value
    mapping (address => uint256) public balances;

    // allowed[from_address][contract_acting_on_behalf] = allowance of contract acting on behalf
    mapping (address => mapping (address => uint256)) public allowed;

    function name() public view returns (string memory) {
        return "HughCoin";
    }

    function symbol() public view returns (string memory) {
        return "HUGH";
    }

    function decimals() public view returns (uint8) {
        return 8;
    }

    function totalSupply() public view returns (uint256) {
        return 21000000;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    /*
       Transfers funds from caller (msg.sender) to the _to address
   */
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value); // check sender has enough funds
        balances[msg.sender] -= _value; // deduct from sender
        balances[_to] += _value; // add to receiver
        emit Transfer(msg.sender, _to, _value); // emit event
        return true;
    }

    /*
       - Checks if the caller (msg.sender) is allowed to move funds from the _from account.
       - If yes, moves funds from the _from account to the _to account
       - Amount is then deducted from the caller’s allowance.
       - This function can be called by a smart contract which is why we need to check if the contract has enough allowance
   */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        // Check that the caller (msg.sender) is allowed to use this much in the _from account
        uint256 allowance = allowed[_from][msg.sender];

        // Check balance of _from is larger than value and if allowance is large enough
        require(balances[_from] >= _value && allowance >= _value);

        balances[_to] += _value;
        balances[_from] -= _value;

        // Deduct from allowance if allowance is not infinite
        if(allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value);

        return true;
    }

    /*
        Allows the spender to use this amount from the caller's (msg.sender) account
    */
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        // Amount that spender is allowed to use from owner's fund
        return allowed[_owner][_spender];
    }
}

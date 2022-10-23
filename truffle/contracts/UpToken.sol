// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract UpToken is ERC20,Pausable{

    uint256 private immutable _cap;

    constructor(uint256 initialSupply,uint256 cap_) ERC20("UpToken", "UP") {
        require(cap_ > 0, "ERC20Capped: cap is 0");
        _cap = cap_;
        _mint(msg.sender, initialSupply);
    }

     function cap() public view virtual returns (uint256) {
        return _cap;
    }

      function _mint(address account, uint256 amount) internal virtual override whenNotPaused {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }
    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);
        require(!paused(), "ERC20Pausable: token transfer while paused");
    }    
}
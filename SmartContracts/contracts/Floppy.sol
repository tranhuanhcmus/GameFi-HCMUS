//SPDX-License-Identifier: UNLICENSED
pragma solidity <=0.8.20;
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract Floppy is ERC20, ERC20Burnable, Ownable {
    uint256 private cap = 50_000_000_000 * 10 ** uint256(18);

    constructor() ERC20("Floppy", "FLP") Ownable(_msgSender()) {
        _mint(msg.sender, cap);
        transferOwnership(msg.sender);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(ERC20.totalSupply() + amount <= cap,"Not enough tokens");
        _mint(to, amount);
    }
}

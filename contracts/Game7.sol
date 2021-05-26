//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.3;
import "hardhat/console.sol";

contract Game7 {
    event Winner(address winner);

    uint256 LAST_2_BITS = 0x03;

    constructor() {}

    function win(uint256 guess) public payable {
        require(guess < 4);
        uint256 b = block.number & LAST_2_BITS;
        require(guess == b, "Sorry no bluck");
        emit Winner(msg.sender);
    }
}

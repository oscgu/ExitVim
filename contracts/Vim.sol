// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Vim {
    uint256 totalExits;

    constructor() {
        console.log("Im a very very smart contract");
    }

    function exitVim() public {
        totalExits += 1;
        console.log("%s has successfully exited Vim!", msg.sender);
    }

    function getTotalExits() public view returns (uint256) {
        
        console.log("%d people managed to exit Vim!", totalExits);
        return totalExits;
    }
}


pragma solidity ^0.8.0;
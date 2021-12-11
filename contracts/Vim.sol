// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Vim {
    uint256 totalExits;
    uint256 private seed;

    event NewExit(address indexed from, uint256 timestamp, string message);

    struct Exit {
        address exitter;
        string message;
        uint256 timestamp;
    }

    Exit[] exits;

    mapping(address => uint256) public lastExittedAt;

    constructor() payable {
        console.log("Hmmm...");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function exitVim(string memory _message) public {
        require(
            lastExittedAt[msg.sender] + 24 hours < block.timestamp,
            "Wait 24h"
        );

        lastExittedAt[msg.sender] = block.timestamp;

        totalExits += 1;
        console.log("%s exited Vim:", msg.sender, _message);

        exits.push(Exit(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;

        if (seed <= 50) {
            console.log("%s got a reward!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has :("
            );

            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw from contract :/");
        }
        emit NewExit(msg.sender, block.timestamp, _message);
    }

    function getAllExits() public view returns (Exit[] memory) {
        return exits;
    }

    function getTotalExits() public view returns (uint256) {
        
        console.log("%d people managed to exit Vim!", totalExits);
        return totalExits;
    }
}


pragma solidity ^0.8.0;
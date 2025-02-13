// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Crowdfunding {
    address public owner;
    uint256 public goal;
    uint256 public deadline;
    uint256 public totalFunds;
    mapping(address => uint256) public contributions;

    event DonationReceived(address indexed donor, uint256 amount);
    event FundsWithdrawn(address indexed owner, uint256 amount);
    event RefundIssued(address indexed donor, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier campaignActive() {
        require(block.timestamp < deadline, "Campaign has ended");
        _;
    }

    constructor(uint256 _goal, uint256 _durationInDays) {
        owner = msg.sender;
        goal = _goal;
        deadline = block.timestamp + (_durationInDays * 1 days);
    }

    function donate() external payable campaignActive {
        require(msg.value > 0, "Donation must be greater than zero");
        
        contributions[msg.sender] += msg.value;
        totalFunds += msg.value;

        emit DonationReceived(msg.sender, msg.value);
    }

    function withdrawFunds() external onlyOwner {
        require(totalFunds >= goal, "Funding goal not reached");
        require(block.timestamp > deadline, "Campaign is still running");

        uint256 amount = totalFunds;
        totalFunds = 0;
        payable(owner).transfer(amount);

        emit FundsWithdrawn(owner, amount);
    }

    function claimRefund() external {
        require(block.timestamp > deadline, "Campaign is still running");
        require(totalFunds < goal, "Funding goal was reached, no refunds");

        uint256 donatedAmount = contributions[msg.sender];
        require(donatedAmount > 0, "No donation found");

        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(donatedAmount);

        emit RefundIssued(msg.sender, donatedAmount);
    }

    function getTimeLeft() external view returns (uint256) {
        if (block.timestamp >= deadline) {
            return 0;
        }
        return deadline - block.timestamp;
    }
}

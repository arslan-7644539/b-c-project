const { default: Web3 } = require("web3");

const Crowdfunding = artifacts.require("Crowdfunding");

module.exports = function (deployer) {
  const goal = Web3.utils.toWei("5", "ether"); // 5 ETH goal
  const durationInDays = 7; // 7 days duration
  deployer.deploy(Crowdfunding, goal, durationInDays);
};

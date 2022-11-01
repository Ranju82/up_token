const UpToken = artifacts.require("UpToken");
const UpTokenSale = artifacts.require("UpTokenSale");

require("dotenv").config({path: "../.env"});

module.exports =async function (deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(UpToken,process.env.INITIAL_SUPPLY,process.env.CAP);
  await deployer.deploy(UpTokenSale, 1, addr[0], UpToken.address);
  let tokenInstance = await UpToken.deployed();
  await tokenInstance.transfer(UpTokenSale.address, process.env.INITIAL_SUPPLY);
};

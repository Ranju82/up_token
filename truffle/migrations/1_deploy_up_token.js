const UpToken = artifacts.require("UpToken");
require("dotenv").config({path: "../.env"});

module.exports = function (deployer) {
  deployer.deploy(UpToken,process.env.INITIAL_SUPPLY,process.env.CAP);
};

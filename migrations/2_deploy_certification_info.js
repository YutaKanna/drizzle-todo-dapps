const CertificationInfo = artifacts.require("./CertificationInfo.sol");
module.exports = function(deployer) {
  deployer.deploy(CertificationInfo);
};
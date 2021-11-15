var SearchableEncryptionScheme = artifacts.require(
  "./SearchableEncryptionScheme.sol"
);

module.exports = function (deployer) {
  deployer.deploy(SearchableEncryptionScheme);
};

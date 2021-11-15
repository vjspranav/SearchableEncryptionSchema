pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SearchableEncryptionScheme.sol";

contract TestSearchableEncryptionScheme {
  function testItStoresAValue() public {
    SearchableEncryptionScheme ses = SearchableEncryptionScheme(DeployedAddresses.SearchableEncryptionScheme());
    ses.store(["hello"], "Hello World");  
    string expected = "Hello World";
    Assert.equal(simpleStorage.retrieve("hello"), expected, "It should store the value Hello World.");
  }

}

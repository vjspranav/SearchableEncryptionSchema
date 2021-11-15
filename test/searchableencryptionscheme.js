const SearchableEncryptionScheme = require("../contracts/SearchableEncryptionScheme.sol");

contract("SearchableEncryptionScheme", (accounts) => {
  it("...should store the value 89.", async () => {
    const searchableEncryptionScheme =
      await SearchableEncryptionScheme.deployed();
    // Use store and send ["hello", "world"] and "Hello World" as arguments
    await searchableEncryptionScheme.store(["hello", "world"], "Hello World", {
      from: accounts[0],
    });

    // Get stored value
    const storedData = await simpleStorageInstance.retrieve("hello").call();
    assert.equal(
      storedData,
      "Hello World",
      "The value Hello World was not stored."
    );
  });
});

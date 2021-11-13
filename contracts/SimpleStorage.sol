// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

// contract SimpleStorage {
//   uint storedData;

//   function set(uint x) public {
//     storedData = x;
//   }

//   function get() public view returns (uint) {
//     return storedData;
//   }
// }

// Create a smart contract to implement Searchable Encryption Scheme
contract SimpleStorage {
  // Create a mapping of keywords to data
  mapping(string => string) keywordToData;
  
  // Allow authenticated user to store mapping of keyword to encrypted data
  function store(string memory keyword, string memory encryptedData) public {
    keywordToData[keyword]=encryptedData;
  }

  // Allow authenticated user to retrieve encrypted data using keyword
  function retrieve(string memory keyword) public view returns (string memory) {
    return keywordToData[keyword];
  }

}

// Create a smart contract to implement Searchable Symmetric Encryption Scheme

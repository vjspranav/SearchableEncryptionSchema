// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import {Seriality} from './Seriality.sol';

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
contract SearchableEncryptionScheme is Seriality {
  function getBytes(uint startindex, uint endindex, string [] memory arr) public view returns(bytes memory serialized){

      require(endindex >= startindex);
      endindex = arr.length - 1;
      
      //64 byte is needed for safe storage of a single string.
      //((endindex - startindex) + 1) is the number of strings we want to pull out.
      uint offset = 64*((endindex - startindex) + 1);
      
      bytes memory buffer = new  bytes(offset); 
      string memory out1  = new string(32);
      
      
      for(uint i = startindex; i <= endindex; i++){
          out1 = arr[i];
          
          stringToBytes(offset, bytes(out1), buffer);
          offset -= sizeOfString(out1);
      }
    
    return (buffer);
  }

  // Create a mapping of keywords to data
  mapping(string => string[]) keywordToData;
  
  // Allow authenticated user to store mapping of keyword to encrypted data
  function store(string memory keyword, string memory encryptedData) public {
    keywordToData[keyword].push(encryptedData);
  }

  // Store array keywords and encrypted data in a mapping
  function storeMultiple(string[] memory keywords, string memory encryptedData) public {

    for (uint i = 0; i < keywords.length; i++) {
      keywordToData[keywords[i]].push(encryptedData);
    }
  }

  // Allow authenticated user to retrieve encrypted data using keyword
  function retrieve(string memory keyword) public view returns (string memory) {
    // Stringify and return
    // encode array of strings
    // return getBytes(0, keywordToData[keyword].length-1, keywordToData[keyword]);
    return keywordToData[keyword][2];
  }

}

// Create a smart contract to implement Searchable Symmetric Encryption Scheme

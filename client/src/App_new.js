import "./App.css";

import React, { useState, useEffect, createContext } from "react";
import getWeb3 from "./getWeb3";

export const BlockchainContext = createContext();

const App = (props) => {
  const [blockchain, setBlockchain] = useState({
    web3: null,
    accounts: null,
    contract: null,
    userAccount: null,
  });

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = AuctionContract.networks[networkId];

        let userAccount = await web3.eth.getCoinbase();
        const contract = new web3.eth.Contract(
          AuctionContract.abi,
          deployedNetwork && deployedNetwork.address,
          {
            from: userAccount, // default from address
            gasPrice: "20000000000", // default gas price in wei, 20 gwei in this case
          }
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setBlockchain({ web3, accounts, contract, userAccount });
        console.log({ web3, accounts, contract, userAccount });
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
    init();
  }, []);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 2000);
  }, []);

  return blockchain.web3 === null || !load ? (
    <div>
      <h1>Loading Web3, accounts, and contract...</h1>
    </div>
  ) : (
    <div>
      <h1>Loaded</h1>
    </div>
  );
};

export default App;

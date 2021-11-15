import "./App.css";

import React, { useState, useEffect, createContext } from "react";
import SearchableEncryptionScheme from "./contracts/SearchableEncryptionScheme.json";
import getWeb3 from "./getWeb3";

// UI
// Import material ui card
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const BlockchainContext = createContext();

const App = (props) => {
  const [blockchain, setBlockchain] = useState({
    web3: null,
    accounts: null,
    contract: null,
    userAccount: null,
  });
  const [output, setOutput] = useState("");
  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SearchableEncryptionScheme.networks[networkId];

        let userAccount = await web3.eth.getCoinbase();
        const contract = new web3.eth.Contract(
          SearchableEncryptionScheme.abi,
          deployedNetwork && deployedNetwork.address,
          {
            from: userAccount, // default from address
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

  const useStyles = makeStyles({
    root: {
      width: "50vh",
      height: "50vh",
      padding: "10px",
      margin: "10px",
    },
  });

  const classes = useStyles();

  // A material UI card with two input text fields
  const CardUI1 = () => {
    return (
      <Card className={classes.root}>
        <CardContent>
          <div
            style={{
              display: "flex-row",
            }}
          >
            {/* Three divs one below other */}
            <div
              style={{
                margin: "10px",
              }}
            >
              <TextField id="message" label="Message" variant="outlined" />
            </div>
            <div>
              <TextField
                style={{
                  margin: "10px",
                }}
                id="keywords"
                label="Enter keywords"
                variant="outlined"
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  const message = document.getElementById("message").value;
                  // Get keywords array separated by space or ,
                  const keywords = document.getElementById("keywords").value;
                  const keywordsArray = keywords.split(/[ ,]+/);
                  console.log(message, [...new Set(keywordsArray)]);
                  await blockchain.contract.methods
                    .storeMultiple([...new Set(keywordsArray)], message)
                    .send({ from: blockchain.userAccount, gas: 3000000 });
                }}
              >
                SetValue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const CardUI2 = () => {
    return (
      <Card className={classes.root}>
        <CardContent>
          <div
            style={{
              display: "flex-row",
            }}
          >
            {/* Three divs one below other */}
            <div
              style={{
                margin: "10px",
              }}
            >
              <TextField
                id="output-keyword"
                label="Enter keywords"
                variant="outlined"
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  const message =
                    document.getElementById("output-keyword").value;
                  const response = await blockchain.contract.methods
                    .retrieve(message)
                    .call({ from: blockchain.userAccount, gas: 3000000 });
                  setOutput(response);
                }}
              >
                GetValue
              </Button>
            </div>
          </div>

          {/*Display output at the center of card*/}
          <Typography variant="h5" component="h2">
            {output}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return blockchain.web3 === null || !load ? (
    <div>
      <h1>Loading Web3, accounts, and contract...</h1>
    </div>
  ) : (
    <div className="App">
      {/* vertical center the CardUI */}
      <Typography variant="h5" component="h2">
        Searchable Encryption Scheme
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20vh",
        }}
      >
        <CardUI1 />
        <CardUI2 />
      </div>
    </div>
  );
};

export default App;

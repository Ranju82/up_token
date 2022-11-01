import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async (upTokenArtifact,upTokenSaleArtifact) => {
      if (upTokenArtifact && upTokenSaleArtifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        
        let upTokenAddress,upTokenSaleAddress, upTokenContract,upTokenSaleContract;
        try {
          const { abi } = upTokenArtifact;
          upTokenAddress = upTokenArtifact.networks[networkID].address;
          upTokenContract = new web3.eth.Contract(abi, upTokenAddress);
        } catch (err) {
          console.error(err);
        }

        try {
          const { abi } = upTokenSaleArtifact;
          upTokenSaleAddress = upTokenSaleArtifact.networks[networkID].address;
          upTokenSaleContract = new web3.eth.Contract(abi, upTokenSaleAddress);
        } catch (err) {
          console.error(err);
        }

        dispatch({
          type: actions.init,
          data: { upTokenSaleAddress, web3, accounts, networkID, upTokenContract, upTokenSaleContract}
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const upTokenArtifact = require("../../contracts/UpToken.json");
        const upTokenSaleArtifact = require("../../contracts/UpTokenSale.json");
        init(upTokenArtifact,upTokenSaleArtifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;

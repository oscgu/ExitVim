import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/Vim.json";

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [exitCount, setCurrentCount] = useState("");
  const [allExits, setAllExits] = useState([]);
  const [text, setText] = useState("");
  const contractAddress = "0x78B97c958cB41a7A0C53650Bdf0b01aCd01C1C03";

  const contractAbi = abi.abi;

  const getAllExits = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const vimContract = new ethers.Contract(contractAddress, contractAbi, signer);

        const exits = await vimContract.getAllExits();

        const exitsCleaned = exits.map(exit => {
          return {
            address: exit.exitter,
            timestamp: new Date(exit.timestamp * 1000).toISOString().slice(0, 16).replace('T', ' '),
            message: exit.message
          };
        });

        setAllExits(exitsCleaned);

      vimContract.on('NewExit', (from, timestamp, message) => {
        console.log("NewExit", from, timestamp, message);

        setAllExits(prevState => [
          ...prevState,
          {
            address: from,
            timestamp: new Date(timestamp * 1000).toISOString().slice(0, 16).replace('T', ' '),
            message: message
          },
        ]);
      });
      } else {
        console.log("Eth obj doesnt exit :/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have Metamask!");
      } else {
        console.log("We have the eth object!", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized accont:", account);
        setCurrentAccount(account);
        getAllExits();
        getCurrentExitCount();
      } else {
        console.log("No authorized accounts found.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const getCurrentExitCount = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const vimContract = new ethers.Contract(contractAddress, contractAbi, signer);

        const count = await vimContract.getTotalExits();
        setCurrentCount(count.toString());
      } else {
        console.log("We dont have the obj :((");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const exitVim = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const vimContract = new ethers.Contract(contractAddress, contractAbi, signer);

        const exitTxn = await vimContract.exitVim(text);
        console.log("Trying to exit insert mode...", exitTxn.hash);

        await exitTxn.wait();
        console.log("Exited. Finally...", exitTxn.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          Vim
        </div>

        <div className="stackoverflow">
          <a href="https://stackoverflow.com/questions/11828270/how-do-i-exit-the-vim-editor">Help</a>
        </div>

        <div className="messageBox">
            <textarea onChange={event => setText(event.target.value)} type="text" />
        </div>

        <button className="exitButton" onClick={exitVim}>
          :wq!
        </button>
        
        {!currentAccount && (
          <button className="connectButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        {currentAccount && (
          <div className="accountAddress">
            {currentAccount}
          </div>
        )
        }

        {allExits.map((exit, index) => {
          return (
            <div key={index} className="exitMessages">
              <div>Address: {exit.address}</div>
              <div>Time: {exit.timestamp}</div>
              <div>Message: {exit.message}</div>
            </div>
          )
        })}

        {exitCount > 0 && (
          <div className="exitCount">
            {exitCount} web3 devs escaped!
          </div>
        )}

        <div className="vimBar">
          <div className="vimBarInner">
            INSERT
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App
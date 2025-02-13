import React, { useState } from "react";
import { ethers } from "ethers";

const Wallet = () => {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);

  // Polygon network details
  const networks = {
    polygon: {
      chainId: "0x89", // 137 in hexadecimal
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
  };

  // Connect MetaMask Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        // Get network details
        const network = await provider.getNetwork();
        setNetwork(network.name);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  // Switch to Polygon Network
  const switchNetwork = async () => {
    if (!window.ethereum) return alert("MetaMask is not installed!");
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [networks.polygon],
      });
      alert("Switched to Polygon Network!");
    } catch (error) {
      console.error("Error switching network:", error);
    }
  };

  return (
    <div>
      <h2>Web3 Wallet</h2>
      {account ? (
        <div>
          <p>Connected: {account}</p>
          <p>Network: {network || "Unknown"}</p>
          <button onClick={switchNetwork}>Switch to Polygon</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Wallet;

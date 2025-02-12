import { ethers } from "ethers";
import { useState } from "react";

const MetaMask = () => {
  // ---------------------------
  const [walletAddress, setWalletAddress] = useState("");
  const [showBalance, setShowBalance] = useState("");

  // ----------------------------- connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed!", error);
      }
    }
  };
  // ----------------------------------------balance check
  const getBalance = async () => {
    if (walletAddress) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(walletAddress);
      const currentBalance = `Balance: ${ethers.formatEther(balance)} ETH`;
      setShowBalance(currentBalance);
    //   alert(currentBalance)
    }
  };
  // ------------------------------transaction method
  const sendEther = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    try {
      const tx = await signer.sendTransaction({
        to: "0xE0671F2E5bCe8988f9b12f036eb2B42D47F600D2",
        value: ethers.parseEther("0.01"),
      });
      alert(`Transaction sent! Hash: ${tx.hash}`);
    } catch (error) {
      alert(" insufficient funds ");
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-96 text-center transition-transform transform hover:scale-105">
        {/* Wallet Header */}
        <h2 className="text-2xl font-bold text-blue-400 mb-6">Crypto Wallet</h2>

        {/* Connect Wallet Button */}
        <button
          onClick={connectWallet}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl mb-4 transition-all duration-300"
        >
          🚀 Connect Wallet
        </button>

        {/* Show Wallet Address */}
        {walletAddress && (
          <p className="text-green-400 text-sm bg-gray-700 py-2 px-4 rounded-lg mb-4">
            ✅ Connected:{" "}
            <span className="font-mono text-white">{walletAddress}</span>
          </p>
        )}

        {/* Check Balance Button */}
        <button
          onClick={getBalance}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl mb-4 transition-all duration-300"
        >
          💰 Check Balance
        </button>

        {/* Show Balance */}
        {walletAddress && (
          <p className="text-lg font-semibold text-white bg-gray-700 px-5 py-3 rounded-xl shadow-md">
            <span className="text-yellow-300">{showBalance} </span>
          </p>
        )}

        {/* Send Ether Button */}
        <button
          onClick={sendEther}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl mt-6 transition-all duration-300"
        >
          ⚡ Send 0.01 ETH
        </button>
      </div>
    </div>
  );
};

export default MetaMask;

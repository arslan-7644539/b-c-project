// import { ethers } from "ethers";
// import { useState } from "react";

// const MetaMask = () => {
//   // ---------------------------
//   const [walletAddress, setWalletAddress] = useState("");
//   const [showBalance, setShowBalance] = useState("");
//   const userWallat = window.ethereum;

//   // ----------------------------- connect wallet
//   const connectWallet = async () => {
//     if (userWallat) {
//       try {
//         const accounts = await userWallat.request({
//           method: "eth_requestAccounts",
//         });
//         setWalletAddress(accounts[0]);
//       } catch (error) {
//         console.error("Wallet connection failed!", error);
//       }
//     }
//   };
//   // ----------------------------------------balance check
//   const getBalance = async () => {
//     if (walletAddress) {
//       const provider = new ethers.BrowserProvider(userWallat);
//       const balance = await provider.getBalance(walletAddress);
//       const currentBalance = `Balance: ${ethers.formatEther(balance)} ETH`;
//       setShowBalance(currentBalance);
//       //   alert(currentBalance)
//     }
//   };
//   // ------------------------------transaction method
//   const sendEther = async () => {
//     const provider = new ethers.BrowserProvider(userWallat);
//     const signer = await provider.getSigner();
//     try {
//       const tx = await signer.sendTransaction({
//         to: "0xE0671F2E5bCe8988f9b12f036eb2B42D47F600D2",
//         value: ethers.parseEther("0.01"),
//       });
//       alert(`Transaction sent! Hash: ${tx.hash}`);
//     } catch (error) {
//       alert(" insufficient funds ");
//       console.error("Transaction failed:", error);
//     }
//   };

//   // ------------------------------------------------ Switch A/c Method

//   const accountSwitch = async ()=>{
//     if(userWallat){
//       try {
//         await userWallat.request({
//           method: "wallat_switchEthereumChain",
//           param: [{chainId:  "0x38" }]
//         })
//         alert("Switch to binance smart chain")
//       } catch (error) {
//         console.log(error);
        
//       }
//     }

//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
//       <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-96 text-center transition-transform transform hover:scale-105">
//         {/* Wallet Header */}
//         <h2 className="text-2xl font-bold text-blue-400 mb-6">Crypto Wallet</h2>

//         {/* Connect Wallet Button */}
//         <button
//           onClick={connectWallet}
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl mb-4 transition-all duration-300"
//         >
//           🚀 Connect Wallet
//         </button>

//         {/* Show Wallet Address */}
//         {walletAddress && (
//           <p className="text-green-400 text-sm bg-gray-700 py-2 px-4 rounded-lg mb-4">
//             ✅ Connected:{" "}
//             <span className="font-mono text-white">{walletAddress}</span>
//           </p>
//         )}

//         {/* Check Balance Button */}
//         <button
//           onClick={getBalance}
//           className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl mb-4 transition-all duration-300"
//         >
//           💰 Check Balance
//         </button>

//         {/* Show Balance */}
//         {walletAddress && (
//           <p className="text-lg font-semibold text-white bg-gray-700 px-5 py-3 rounded-xl shadow-md">
//             <span className="text-yellow-300">{showBalance} </span>
//           </p>
//         )}

//         {/* Send Ether Button */}
//         <button
//           onClick={sendEther}
//           className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl mt-6 transition-all duration-300"
//         >
//           ⚡ Send 0.01 ETH
//         </button>
//         <br />
//         <button
//           onClick={accountSwitch}
//           className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl mt-6 transition-all duration-300"
//         >
//           Switch to binance
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MetaMask;




import { ethers } from "ethers";
import { useState } from "react";

const MetaMask = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [showBalance, setShowBalance] = useState("");
  const userWallet = window.ethereum;

  // Connect Wallet
  const connectWallet = async () => {
    if (userWallet) {
      try {
        const accounts = await userWallet.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed!", error);
      }
    }
  };

  // Get Balance
  const getBalance = async () => {
    if (walletAddress) {
      const provider = new ethers.BrowserProvider(userWallet);
      const balance = await provider.getBalance(walletAddress);
      setShowBalance(`Balance: ${ethers.formatEther(balance)} ETH`);
    }
  };

  // Send Ether
  const sendEther = async () => {
    try {
      const provider = new ethers.BrowserProvider(userWallet);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: "0xE0671F2E5bCe8988f9b12f036eb2B42D47F600D2",
        value: ethers.parseEther("0.01"),
      });
      alert(`Transaction sent! Hash: ${tx.hash}`);
    } catch (error) {
      alert("Insufficient funds or transaction failed!");
      console.error("Transaction failed:", error);
    }
  };

  // Switch to Binance Smart Chain
  const switchNetwork = async () => {
    if (userWallet) {
      try {
        await userWallet.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }], // BSC Mainnet
        });
        alert("Switched to Binance Smart Chain!");
      } catch (error) {
        if (error.code === 4902) {
          // If chain is not added, add it first
          try {
            await userWallet.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: "0x38",
                chainName: "Binance Smart Chain",
                nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
                rpcUrls: ["https://bsc-dataseed.binance.org/"],
                blockExplorerUrls: ["https://bscscan.com"],
              }],
            });
            alert("BSC added and switched!");
          } catch (addError) {
            console.error("Failed to add BSC:", addError);
          }
        } else {
          console.error("Network switch failed:", error);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-96 text-center transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold text-blue-400 mb-6">Crypto Wallet</h2>

        <button onClick={connectWallet} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl mb-4">
          🚀 Connect Wallet
        </button>

        {walletAddress && (
          <p className="text-green-400 text-sm bg-gray-700 py-2 px-4 rounded-lg mb-4">
            ✅ Connected: <span className="font-mono text-white">{walletAddress}</span>
          </p>
        )}

        <button onClick={getBalance} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl mb-4">
          💰 Check Balance
        </button>

        {walletAddress && <p className="text-lg font-semibold text-white bg-gray-700 px-5 py-3 rounded-xl shadow-md">{showBalance}</p>}

        <button onClick={sendEther} className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl mt-6">
          ⚡ Send 0.01 ETH
        </button>

        <button onClick={switchNetwork} className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl mt-6">
          🌐 Switch to Binance
        </button>
      </div>
    </div>
  );
};

export default MetaMask;

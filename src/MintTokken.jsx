// import { useState } from "react";
// import { useContract, useContractWrite } from "@thirdweb-dev/react";

// export default function MintToken() {
//   // ERC-20 Contract ka address (Isse replace karein apne contract se)
//   const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

//   // Thirdweb se contract access karna
//   const { contract } = useContract(contractAddress);

//   // Contract ke mintTo function ko call karne ka hook
//   const { mutateAsync: mintTo, isLoading } = useContractWrite(contract, "mintTo");

//   // State for user input
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");

//   // Function to mint tokens
//   const handleMint = async () => {
//     if (!recipient || !amount) {
//       alert("Please enter recipient address and amount!");
//       return;
//     }

//     try {
//       const data = await mintTo({
//         args: [recipient, amount], // Smart contract ke function ke arguments
//       });
//       console.log("Minted successfully:", data);
//       alert("Tokens Minted Successfully!");
//     } catch (error) {
//       console.error("Minting failed", error);
//       alert("Error Minting Tokens!");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Mint ERC-20 Tokens</h2>
//       <input
//         type="text"
//         placeholder="Recipient Address"
//         value={recipient}
//         onChange={(e) => setRecipient(e.target.value)}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         style={styles.input}
//       />
//       <button onClick={handleMint} style={styles.button} disabled={isLoading}>
//         {isLoading ? "Minting..." : "Mint Tokens"}
//       </button>
//     </div>
//   );
// }

// // Basic Styling
// const styles = {
//   container: {
//     textAlign: "center",
//     padding: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "10px",
//     maxWidth: "400px",
//     margin: "auto",
//     backgroundColor: "#f8f9fa",
//   },
//   input: {
//     display: "block",
//     width: "100%",
//     padding: "10px",
//     margin: "10px 0",
//     borderRadius: "5px",
//     border: "1px solid #ddd",
//   },
//   button: {
//     padding: "10px 20px",
//     backgroundColor: "#28a745",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

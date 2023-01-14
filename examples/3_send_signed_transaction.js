const { ethers } = require('ethers');
require('dotenv').config();

const infuraApiKey = process.env.INFURA_API_KEY;
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${infuraApiKey}`);


const account1 = "0xeB8aF5c8884B7D15618A045B717590f1Bb4B3cA4";  // sender
const account2 = "0xAe67706C9780dEF52DD7d347dDd73C980545205a";  // recipient

const privateKey1 = process.env.GOERLI_SENDER_PRIVATE_KEY;  // Sender's private keys
const wallet = new ethers.Wallet(privateKey1, provider);  // New instance to sender's wallet



const main = async () => {
    // Show account 1 balance before transfer
    console.log(`\nWallet 1 balance before tx: ${await provider.getBalance(account1)}\n`);
    // Show account 2 balance before transfer
    console.log(`Wallet 2 balance before tx: ${await provider.getBalance(account2)}\n`);




    // Send Ether
    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.025")
    });

    // Fetch Transaction
    await tx.wait();  // wait for the transaction to be mined before console logging the transaction
    console.log(tx + '\n');






    // Show account 1 balance after transfer
    console.log(`Wallet 1 balance after tx: ${await provider.getBalance(account1)}\n`);
    // Show account 2 balance after transfer
    console.log(`Wallet 2 balance after tx: ${await provider.getBalance(account2)}\n`);
}   

main();
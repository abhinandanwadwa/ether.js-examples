const { ethers } = require('ethers');
require('dotenv').config();

const infuraApiKey = process.env.INFURA_API_KEY;
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${infuraApiKey}`);

const account1 = "0xeB8aF5c8884B7D15618A045B717590f1Bb4B3cA4";
const account2 = "0xAe67706C9780dEF52DD7d347dDd73C980545205a";

const privateKey1 = process.env.GOERLI_SENDER_PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey1, provider);


const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)"
];


const address = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {



    const contractWithWallet = contract.connect(wallet);
    const tx = await contractWithWallet.transfer(account2, '10');
    await tx.wait();

    console.log(tx);
}

main();
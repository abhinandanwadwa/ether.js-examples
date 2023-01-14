const { ethers } = require('ethers');
require('dotenv').config();

const infuraApiKey = process.env.INFURA_API_KEY;
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${infuraApiKey}`);


const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";  // DAI Contract
const contract = new ethers.Contract(address, ERC20_ABI, provider);



const main = async () => {
    const latestBlock = await provider.getBlockNumber();

    // const transferEvents = await contract.queryFilter('Transfer', 16403973, 16403998);
    const transferEvents = await contract.queryFilter('Transfer', (latestBlock - 10), latestBlock);
    console.log(transferEvents);
}
main();
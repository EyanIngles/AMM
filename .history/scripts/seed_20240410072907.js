// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const config = require('../src/config.json')

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens
const shares = ether

async function main() {

    console.log(`Fetching accounts and network details... \n`)
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]
    const investor1 = accounts[1]
    const investor2 = accounts[2]
    const investor3 = accounts[3]
    const investor4 = accounts[4]

    //Fetch network
    const { chainId } =  await ethers.provider.getNetwork()
    console.log(`Fetching token and transferring to accounts \n`)

    const Dapp = await ethers.getContractAt('Token', config[chainId].Dapp.address)
    console.log(`Dapp Token fetched: ${Dapp.address} \n`)

    const Ease = await ethers.getContractAt('Token', config[chainId].Ease.address)
    console.log(`Ease Token fetched: ${Ease.address} \n`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

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

    // distributing tokens to investors
    let transaction

    //sending tokens to investors, sending dapp
    transaction = await Dapp.connect(deployer).transfer(investor1.address, tokens(10))
    await transaction.wait()
    //sending ease
    transaction = await Ease.connect(deployer).transfer(investor2.address, tokens(10))
    await transaction.wait()
    //sending dapp
    transaction = await Dapp.connect(deployer).transfer(investor3.address, tokens(10))
    await transaction.wait()
    //sending Ease Token
    transaction = await Ease.connect(deployer).transfer(investor4.address, tokens(10))
    await transaction.wait()

    //adding liquidity to AMM contract
    let amount = tokens(100)
    console.log(`fetching AMM...\n`)

    const amm = await ethers.getContractAt('AMM', consfig[chainId].amm.address)
    console.log(`AMM Fetched: ${amm.address}\n`)

    //approving transaction
    transaction = await Dapp.connect(deployer).approve(amm.address, amount)
    await transaction.wait()

    transaction = await Ease.connect(deployer).approve(amm.address, amount)
    await transaction.wait()

    //adding the liquidity now...
    console.log(`Adding liquidity to contracts \nDapp Token: ${Dapp.address} \nEase Token: ${Ease.address}`)

    transaction = await amm.connect(deployer).addLiquidity(amount, amount)
    await transaction.wait()

    //testing swaps for investor one; swapping Dapp -> Ease Tokens
    console.log(`Investor 1 swapping Dapp -> Ease tokens...\n`)
    //investor approves tokens
    transaction = await Dapp.connect(investor1).approve(tokens(10))
    await transaction.wait()
    //swapping token
    transaction = await amm.connect(investor1).swapToken1(tokens(1))
    await transaction.wait()

    //testing swaps for investor two; swapping Ease -> Dapp Tokens
    console.log(`Investor 1 swapping Ease -> Dapp tokens...\n`)
    //investor approves tokens
    transaction = await Dapp.connect(investor2).approve(tokens(10))
    await transaction.wait()
    //swapping token
    transaction = await amm.connect(investor2).swapToken1(tokens(1))
    await transaction.wait()

    //testing swaps for investor three; swapping Dapp -> Ease Tokens
    console.log(`Investor 1 swapping Dapp -> Ease tokens...\n`)
    //investor approves tokens
    transaction = await Dapp.connect(investor3).approve(tokens(10))
    await transaction.wait()
    //swapping tokens all tokens
    transaction = await amm.connect(investor3).swapToken1(tokens(10))
    await transaction.wait()

    //testing swaps for investor four; swapping Ease -> Dapp Tokens
    console.log(`Investor 1 swapping Dapp -> Ease tokens...\n`)
    //investor approves tokens
    transaction = await Dapp.connect(investor4).approve(tokens(10))
    await transaction.wait()
    //swapping token 5 tokens
    transaction = await amm.connect(investor4).swapToken1(tokens(5))
    await transaction.wait()


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

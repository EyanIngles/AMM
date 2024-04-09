// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // Deploy Token
  const Token = await hre.ethers.getContractFactory('Token')


  let Dapp = await Token.deploy('Dapp Token', 'DAPP', '1000000')
  await Dapp.deployed()

  let Ease = await Token.deploy('Ease Token', 'ES', '10000000')
  await Ease.deployed()

  console.log(`Dapp Token deployed to: ${Dapp.address}\n`)
  console.log(`Ease Token deployed to: ${Ease.address}\n`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens
const shares = ether

describe('AMM', () => {
  let accounts,
      deployer,
      liquidityProvider,
      investor1,
      investor2

  let token1,
      token2,
      amm
      
  beforeEach(async () => {
    // Setup Accounts
    accounts = await ethers.getSigners()
    deployer = accounts[0]
    liquidityProvider = accounts[1]
    investor1 = accounts[2]
    investor2 = accounts[3]

    // Deploy Token
    const Token = await ethers.getContractFactory('Token')
    token1 = await Token.deploy('Dapp University', 'DAPP', '1000000') // 1 Million Tokens
    token2 = await Token.deploy('USD Token', 'USD', '1000000') // 1 Million Tokens

    // Send tokens to liquidity provider
    let transaction = await token1.connect(deployer).transfer(liquidityProvider.address, tokens(100000))
    await transaction.wait()

    transaction = await token2.connect(deployer).transfer(liquidityProvider.address, tokens(100000))
    await transaction.wait()

    // Send token1 to investor1
    transaction = await token1.connect(deployer).transfer(investor1.address, tokens(100000))
    await transaction.wait()

    // Send token2 to investor2
    transaction = await token2.connect(deployer).transfer(investor2.address, tokens(100000))
    await transaction.wait()

    // Deploy AMM
    const AMM = await ethers.getContractFactory('AMM')
    amm = await AMM.deploy(token1.address, token2.address)

    describe('Deployment',async () => {

        it('has an address', async () => {
          expect(amm.address).to.not.equal(0x0)
        })

        it('tracks token1 address', async () => {
          expect(await amm.token1()).to.equal(token1.address)
        })

        it('tracks token2 address', async () => {
          expect(await amm.token2()).to.equal(token2.address)

        })
        it("successfully calls upon swap token1 function", async () => {
            let transaction = await token2.connect(deployer).approve(amm.address, tokens(100))
            let result = await transaction.wait()
    
            console.log(result, "result of approve function")
            transaction = await amm.connect(deployer).swapToken1(tokens(100))
            result = await transaction.wait()
            console.log(result)
    
        })
  })
})
})
const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('Token', () => {
    let token1, token2, accounts, deployer, amm

    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        receiver = accounts[1]
        exchange = accounts[2]

      const Token = await ethers.getContractFactory('Token')
      token1 = await Token.deploy('Dapp University', 'DAPP', '1000000')
      token2 = await Token.deploy('EASE', 'ES', '1000000')

      const AMM =  await ethers.getContractFactory('AMM')
      amm = await AMM.deploy(token1.address, token2.address)


    })

    describe('Deployment of tokens', () => {
        it('token 1 deployment args', async () => {
        const name = 'Dapp University'
        const symbol = 'DAPP'
        const decimals = '18'
        const totalSupply = tokens('1000000')

        expect(await token1.name()).to.equal('Dapp University')
        expect(await token1.symbol()).to.equal('DAPP')
        expect(await token1.decimals()).to.equal('18')
        expect(await token1.totalSupply()).to.equal(tokens('1000000'))
})
        it('token 2 deployment args', async () => {
        const name = 'EASE'
        const symbol = 'ES'
        const decimals = '18'
        const totalSupply = tokens('1000000')

        expect(await token2.name()).to.equal('EASE')
        expect(await token2.symbol()).to.equal('ES')
        expect(await token2.decimals()).to.equal('18')
        expect(await token2.totalSupply()).to.equal(tokens('1000000'))
})

})
})
describe('AMM', () => {
    let token1, token2, accounts, deployer, amm, liquidityProvider, transaction

    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        liquidityProvider = accounts[1]

        //deploying tokens
      const Token = await ethers.getContractFactory('Token')
      token1 = await Token.deploy('Dapp University', 'DAPP', '1000000')
      token2 = await Token.deploy('EASE', 'ES', '1000000')
        //sending tokens to liquidityProvider
        transaction = await token1.connect(deployer).transfer(liquidityProvider.address, tokens(100000))
        await transaction.wait()
        transaction = await token2.connect(deployer).transfer(liquidityProvider.address, tokens(100000))
        await transaction.wait()
        //deploying AMM contract
      const AMM =  await ethers.getContractFactory('AMM')
      amm = await AMM.deploy(token1.address, token2.address)


    })
    describe('Deployment of AMM', () => {
        it('AMM has an contract address', async () => {
        expect(amm.address).to.not.equal('0x0')
        })

        it('AMM Tracks token 1 address', async () => {
        expect(await amm.token1()).to.equal(token1.address)
        })
        it('AMM Tracks token 2 address', async () => {
        expect(await amm.token2()).to.equal(token2.address)
        })
    })
    describe('Swapping tokens', () => {
        it('filicates swaps', async () => {
            let amount, transaction
            amount = tokens(100000)
            transaction = await token1.connect(deployer).approve(amm.address, amount)
            await transaction.wait()
            transaction = await token2.connect(deployer).approve(amm.address, amount)
            await transaction.wait()

            transaction = await amm.connect(deployer).addLiquidity(amount, amount)
            await transaction.wait()

            console.log((await ethers.provider.getBalance(amm.contract(address))).toString())
            console.log((await ethers.provider.getBalance(deployer.address)).toString())
        })
    })
})
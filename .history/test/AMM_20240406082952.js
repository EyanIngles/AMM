const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('Token', () => {
    let token, accounts, deployer, receiver, exchange

    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        receiver = accounts[1]
        exchange = accounts[2]

      const Token = await ethers.getContractFactory('Token')
      token1 = await Token.deploy('Dapp University', 'DAPP', '1000000')
      token2 = await Token.deploy('EASE', 'ES', '1000000')


    })

    describe('Deployment', () => {
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

        expect(await token2.name()).to.equal('EASE'),`${token2.name()}`
        expect(await token2.symbol()).to.equal('ES')
        expect(await token2.decimals()).to.equal('18')
        expect(await token2.totalSupply()).to.equal(tokens('1000000'))
})

})
})
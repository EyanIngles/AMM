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
      const name = 'Dapp University'
      const symbol = 'DAPP'
      const decimals = '18'
      const totalSupply = tokens('1000000')
})
})
const { getValue } = require('@testing-library/user-event/dist/utils');
const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens
const shares = ether

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
    let token1, token2, accounts, deployer, amm, liquidityProvider, transaction, investor1, investor2, investor3

    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        liquidityProvider = accounts[1]
        investor1 = accounts[2]
        investor2 = accounts[3]
        investor3 = accounts[3]

        //deploying tokens
      const Token = await ethers.getContractFactory('Token')
      token1 = await Token.deploy('Dapp University', 'DAPP', '1000000')
      token2 = await Token.deploy('EASE', 'ES', '1000000')
        //sending tokens to liquidityProvider
        transaction = await token1.connect(deployer).transfer(liquidityProvider.address, tokens(100000))
        await transaction.wait()
        transaction = await token2.connect(deployer).transfer(liquidityProvider.address, tokens(100000))
        await transaction.wait()
        //sending tokens to investor1
        transaction = await token1.connect(deployer).transfer(investor1.address, tokens(100000))
        await transaction.wait()
        //sending tokens to investor2
        transaction = await token2.connect(deployer).transfer(investor2.address, tokens(100000))
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
            let amount, transaction, estimate, result
            amount = tokens(100000)
            transaction = await token1.connect(deployer).approve(amm.address, amount)
            await transaction.wait()
            transaction = await token2.connect(deployer).approve(amm.address, amount)
            await transaction.wait()

            transaction = await amm.connect(deployer).addLiquidity(amount, amount)
            await transaction.wait()

            //checks amm receives tokens
            expect(await token1.balanceOf(amm.address)).to.equal(amount)
            expect(await token2.balanceOf(amm.address)).to.equal(amount)

            expect(await amm.token1Balance()).to.equal(amount)
            expect(await amm.token2Balance()).to.equal(amount)

            //check deployer has shares
            expect(await amm.shares(deployer.address)).to.equal(tokens(100))
            expect(await amm.totalShares()).to.equal(tokens(100))


            //LP approves more liquidity 50k tokens
            amount = tokens(50000)
            transaction = await token1.connect(liquidityProvider).approve(amm.address, amount)
            await transaction.wait()
            transaction = await token2.connect(liquidityProvider).approve(amm.address, amount)
            await transaction.wait()

            // Calculate token 2 deposit amount
            let token2Deposit = await amm.calculateToken2Deposit(amount)
            //LP adds liquidity for approved amount.
            transaction = await amm.connect(liquidityProvider).addLiquidity(amount, token2Deposit)
            await transaction.wait()

            expect(await amm.shares(liquidityProvider.address)).to.equal(tokens(50))

            //deployer should still have shares
            expect(await amm.shares(deployer.address)).to.equal(tokens(100))

            // Pool should have 150 shares
            expect(await amm.totalShares()).to.equal(tokens(150))

            console.log(`price before swap: ${await amm.token2Balance() / await amm.token1Balance()}\n`)

            //investor 1 approves swap
            transaction = await token1.connect(investor1).approve(amm.address, tokens(100000))
            await transaction.wait()

            // check balance before swapp of investor 1
            balance = await token2.balanceOf(investor1.address)
            console.log(`Investor1 token2 balance before swap ${ethers.utils.formatEther(balance)}\n`)

            estimate = await amm.calculateToken1Swap(tokens(1))
            console.log(`token2 amount investor1 will receive after swap: ${ethers.utils.formatEther(estimate)}\n`)

            transaction = await amm.connect(investor1).swapToken1(tokens(1))
            result = await transaction.wait()

            await expect(transaction).to.emit(amm, 'Swap').withArgs(
                investor1.address,
                token1.address,
                tokens(1),
                token2.address,
                estimate,
                await amm.token1Balance(),
                await amm.token2Balance(),
                (await ethers.provider.getBlock(await ethers.provider.getBlockNumber())).timestamp
            )

            balance = await token2.balanceOf(investor1.address)
            console.log(`token2 amount investor1 after swap: ${ethers.utils.formatEther(balance)}\n`)

            expect(estimate).to.equal(balance)

            // check AMM token balances are in sync
            expect (await token1.balanceOf(amm.address)).to.equal(await amm.token1Balance())
            expect (await token2.balanceOf(amm.address)).to.equal(await amm.token2Balance())

            console.log(`price after swap: ${await amm.token2Balance() / await amm.token1Balance()}\n\n\n`)

            //investor 1 swaps again
            balance = await token2.balanceOf(investor1.address)
            console.log(`token2 amount investor1 will before second swap: ${ethers.utils.formatEther(balance)}\n`)

            estimate = await amm.calculateToken1Swap(tokens(1))
            console.log(`token2 amount investor1 will receive after swap: ${ethers.utils.formatEther(estimate)}\n`)

            transaction = await amm.connect(investor1).swapToken1(tokens(1))
            result = await transaction.wait()

            balance = await token2.balanceOf(investor1.address)
            console.log(`token2 amount investor1 will after second swap: ${ethers.utils.formatEther(balance)}\n`)

            console.log(`price after swap: ${await amm.token2Balance() / await amm.token1Balance()}\n\n\n`)

            //investor 1 swaps again 3rd time
            balance = await token2.balanceOf(investor1.address)
            console.log(`token2 amount investor1 will before third swap: ${ethers.utils.formatEther(balance)}\n`)

            estimate = await amm.calculateToken1Swap(tokens(1000))
            console.log(`token2 amount investor1 will receive after swap: ${ethers.utils.formatEther(estimate)}\n`)

            transaction = await amm.connect(investor1).swapToken1(tokens(1000))
            result = await transaction.wait()

            balance = await token2.balanceOf(investor1.address)
            console.log(`token2 amount investor1 will after second swap: ${ethers.utils.formatEther(balance)}\n`)

            console.log(`price after swap: ${await amm.token2Balance() / await amm.token1Balance()}\n`)

            // investor 2 swap
            //price of token 1 after swap
            console.log(`price after swap: ${await amm.token1Balance() / await amm.token2Balance()}\n`)

            //investor 2 approves all tokens for swap
            transaction = await token2.connect(investor2).approve(amm.address, tokens(1000))
            await transaction.wait()

            //investor 2 swap before balance
            balance = await token1.balanceOf(investor2.address)
            console.log(`investor2 account balanace before swap: ${ethers.utils.formatEther(balance)}\n`)

            // estimated token2 swap price
            estimate = await amm.calculateToken2Swap(tokens(1000))
            console.log(`estimated token swap price: ${await ethers.utils.formatEther(estimate)}`)

            //investor 2 does swap
            transaction = await amm.connect(investor2).swapToken2(tokens(1000))
            await transaction.wait()

            // Check swap event
            await expect(transaction).to.emit(amm, 'Swap').withArgs(
                investor2.address,
                token2.address,
                tokens(1000),
                token1.address,
                estimate,
                await amm.token2Balance(),
                await amm.token1Balance(),
                (await ethers.provider.getBlock(await ethers.provider.getBlockNumber())).timestamp
            )

            //Check balance after swap
            balance = await token1.balanceOf(investor2.address)
            console.log(`investor2 account balanace after swap: ${ethers.utils.formatEther(balance)}\n`)

            //price of token 1 after swap
            console.log(`price after swap: ${await amm.token1Balance() / await amm.token2Balance()}\n`)

            expect(estimate).to.equal(balance)

            //removing liquidity....

            console.log(`AMM token 1 balance: ${ethers.utils.formatEther(await amm.token1Balance())}`)
            console.log(`AMM token 2 balance: ${ethers.utils.formatEther(await amm.token2Balance())}\n\n`)

            //check LP balance before removing tokens
            balance = await token1.balanceOf(liquidityProvider.address)
            console.log(`liquidity provider token1 balance before removing funds: ${ethers.utils.formatEther(balance)}\n`)

            balance = await token2.balanceOf(liquidityProvider.address)
            console.log(`liquidity provider token2 balance before removing funds: ${ethers.utils.formatEther(balance)}\n`)

            // LP removes token from AMM pool
            transaction = await amm.connect(liquidityProvider).removeLiquidity(shares(50))
            result = await transaction.wait()

            balance = await token1.balanceOf(liquidityProvider.address)
            console.log(`liquidity provider token1 balance after removing funds: ${ethers.utils.formatEther(balance)}\n`)

            balance = await token2.balanceOf(liquidityProvider.address)
            console.log(`liquidity provider token2 balance after removing funds: ${ethers.utils.formatEther(balance)}\n`)

            expect(await amm.shares(liquidityProvider.address)).to.equal(shares(0))
            expect(await amm.shares(deployer.address)).to.equal(shares(100))
            expect(await amm.totalShares()).to.equal(shares(100))

            // it emits an event after swap

            let eventWithdraw = await expect(transaction).to.emit(amm, 'Withdraw').withArgs(
                liquidityProvider.address,
                token1.address,
                shares(50),
                token2.address,
                estimate,
                await amm.token2Balance(),
                await amm.token1Balance(),
                (await ethers.provider.getBlock(await ethers.provider.getBlockNumber())).timestamp
            )
            console.log(await eventWithdraw)

        })
    })
})
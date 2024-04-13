import { setAccount, setProvider, setNetwork } from '../store/reducers/provider';
import { setContracts, setSymbols, balancesLoaded } from './reducers/tokens';
import { setContract, sharesLoaded } from './reducers/amm';
import { ethers } from 'ethers';
import TOKEN_ABI from '../abis/Token.json'
import AMM_ABI from '../abis/AMM.json'
import config from '../config.json'

export const loadProvider = (dispatch) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    dispatch(setProvider(provider))
    return provider
}

export const loadNetwork = async (provider, dispatch) => {
    const { chainId } = await provider.getNetwork()
    dispatch(setNetwork(chainId))

    return provider
}

export const loadAccount = async (dispatch) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = ethers.utils.getAddress(accounts[0])
    dispatch(setAccount(account))

return account
}

export const loadTokens = async (provider, chainId, dispatch) => {
    // need to fix config[chainId].Dapp.address and config[chainId].Ease.address
    // config file is unable to be read effectively using chainId as the network chooser. had to sudo code it in
    const DappToken = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", TOKEN_ABI, provider)
    const EaseToken = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", TOKEN_ABI, provider)

    dispatch(setContracts([EaseToken, DappToken]))
    dispatch(setSymbols([await EaseToken.symbol(), await DappToken.symbol()]))
}
export const loadAMM = async (provider, chainId, dispatch) => {
    // need to fix config[chainId].Dapp.address and config[chainId].Ease.address
    // config file is unable to be read effectively using chainId as the network chooser. had to sudo code it in
    const amm = new ethers.Contract("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", AMM_ABI, provider)

    dispatch(setContract([amm]))
    return amm
}

export const loadBalances = async (amm, tokens, account, dispatch) => {
    const balance1 = await tokens[0].balanceOf(account)
    const balance2 = await tokens[1].balanceOf(account)
    console.log(await tokens[0])


    dispatch(balancesLoaded([
        ethers.utils.formatEther(balance1.toString()),
        ethers.utils.formatEther(balance2.toString())
      ]))

      const shares = await amm.sahres(account)
      dispatch(sharesLoaded(ethers.utils.formatEther(shares.toString())))
}

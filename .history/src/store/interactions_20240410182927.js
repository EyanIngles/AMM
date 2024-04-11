import { setAccount, setProvider, setNetwork } from '../store/reducers/provider';
import { setContracts, setSymbols } from './reducers/tokens';
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
    // config file is unable to be read effectively using chainId as the network chooser.
    const DappToken = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", TOKEN_ABI, provider)
    const EaseToken = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", TOKEN_ABI, provider)

    dispatch(setContracts([EaseToken, DappToken]))
    dispatch(setSymbols([await EaseToken.symbol(), await DappToken.symbol()]))
}

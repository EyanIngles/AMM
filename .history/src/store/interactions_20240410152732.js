import { setAccount, setProvider, setnetwork } from '../store/reducers/provider';
import { setContracts, setSymbols } from './reducers/tokens';
import { ethers } from 'ethers';
import TOKEN_ABI from '../abis/Token.json'
import AMM_ABI from '../abis/AMM.json'
import config from '../config.json';


export const loadProvider = (dispatch) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    dispatch(setProvider(provider))
    return provider
}

export const loadNetwork = async (provider, dispatch) => {
    const { chainId } = await provider.getNetwork()
    dispatch(setnetwork(chainId))

    return provider
}

export const loadAccount = async (dispatch) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = ethers.utils.getAddress(accounts[0])
    dispatch(setAccount(account))

return account
}

export const loadTokens = async (provider, chainId, dispatch) => {
    const Dapp = new ethers.Contract(config[chainId].dapp.address, TOKEN_ABI, provider)
    const Ease = new ethers.Contract(config[chainId].ease.address, TOKEN_ABI, provider)

    dispatch(setContracts([dapp, ease]))
    dispatch(setSymbols([await dapp.symbol(), await ease.symbol()]))
  
}

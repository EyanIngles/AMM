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
    const Dapp = new ethers.Contract(config[chainId].Dapp.address, TOKEN_ABI, provider)
    const Ease = new ethers.Contract(config[chainId].Ease.address, TOKEN_ABI, provider)

    dispatch(setContracts([Dapp, Ease]))
    dispatch(setSymbols([await Dapp.symbol(), await Ease.symbol()]))

}

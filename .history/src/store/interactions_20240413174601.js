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

    return chainId
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
    const DappToken = new ethers.Contract(config[chainId].Dapp.address, TOKEN_ABI, provider)
    const EaseToken = new ethers.Contract(config[chainId].Ease.address, TOKEN_ABI, provider)
    console.log(`Dapp address: ${DappToken.address}`)
    console.log(`Ease address: ${EaseToken.address}`)
    dispatch(setContracts([EaseToken, DappToken]))
    dispatch(setSymbols([await EaseToken.symbol(), await DappToken.symbol()]))
}
export const loadAMM = async (provider, chainId, dispatch) => {
    // need to fix config[chainId].Dapp.address and config[chainId].Ease.address
    // config file is unable to be read effectively using chainId as the network chooser. had to sudo code it in
    const amm = new ethers.Contract(config[chainId].amm.address, AMM_ABI, provider)
    console.log(amm.address)

    dispatch(setContract([amm]))
    return amm
}

export const loadBalances = async (amm, tokens, account, dispatch) => {
    const balance1 = await tokens[0].balanceOf(account)
    const balance2 = await tokens[1].balanceOf(account)


    dispatch(balancesLoaded([
        ethers.utils.formatEther(balance1.toString()),
        ethers.utils.formatEther(balance2.toString())
      ]))
      // not connecting to amm contract nor token contracts via none sudo coding it.
      const shares = await AMM.shares(account);
      dispatch(sharesLoaded(ethers.utils.formatEther(shares.toString())))
}

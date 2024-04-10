import { setAccount } from '../store/reducers/provider';
import { ethers } from 'ethers';

export const loadAccount = async (dispatch) => {
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
const account = ethers.utils.getAddress(accounts[0])
dispatch(setAccount(account))

return account
}
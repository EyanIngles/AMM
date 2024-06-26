import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { Container } from 'react-bootstrap'
import { ethers } from 'ethers'

// Components
import Navigation from './Navigation';
import Loading from './Loading';

import { loadAccount } from '../store/interactions';
import { loadProvider, loadNetwork, loadTokens, loadAMM } from '../store/interactions';

// ABIs: Import your contract ABIs here
// import TOKEN_ABI from '../abis/Token.json'

// Config: Import your network config here
// import config from '../config.json';


function App() {
  const dispatch = useDispatch()

  const loadBlockchainData = async () => {

    const provider = await loadProvider(dispatch)

    const chainId = await loadNetwork(provider, dispatch)

    // await loadAccount(dispatch)

    await loadTokens(provider, chainId, dispatch)
    await loadAMM(provider, chainId, dispatch)

    await loadBalances(loadTokens, loadAccount, dispatch)
  }

  useEffect(() => {
    loadBlockchainData()
  }, []);
  return (
    <Container>
      <Navigation />

      <h1 className='my-4 text-center'>React Hardhat Template</h1>
        <p className='text-center'><strong>Your ETH Balance:</strong> 0 ETH</p>
        <p className='text-center'>Edit App.js to add your code here.</p>
    </Container>
  )
}

export default App;

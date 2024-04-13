import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { Container } from 'react-bootstrap'
import { ethers } from 'ethers'

// Components
import Navigation from './Navigation';

import { loadAccount } from '../store/interactions';
import { loadProvider, loadNetwork, loadTokens, loadAMM } from '../store/interactions';



function App() {
  const dispatch = useDispatch()

  const loadBlockchainData = async () => {

    const provider = await loadProvider(dispatch)

    const chainId = await loadNetwork(provider, dispatch)

    // reload page when network changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })
    //reload page when accounts are changed
    window.ethereum.on('accountsChanged', async () => {
      console.log("account changed")
      await loadAccount(dispatch)
    })

    await loadTokens(provider, chainId, dispatch)
    await loadAMM(provider, chainId, dispatch)

  }

  useEffect(() => {
    loadBlockchainData()
  }, []);
  return (
    <Container>
      <Navigation />

      <hr></hr>

    </Container>
  )
}

export default App;

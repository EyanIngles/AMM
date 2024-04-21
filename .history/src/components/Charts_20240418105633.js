import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import { useEffect } from "react";
import { loadAllSwaps } from '../store/interactions'


import Loading from "./Loading";


const Charts = () => {

  const provider = useSelector(state => state.provider.connection)
  const tokens = useSelector(state => state.tokens.contracts)
  const amm = useSelector(state => state.amm.contract)
  const shares = useSelector(state => state.amm.shares)

  const dispatch = useDispatch()

  useEffect(() => {
    if(provider && amm) {
    loadAllSwaps(provider, amm, dispatch)
    }
  }, [provider, amm, dispatch]);
    return (
      <div>Charts</div>
    );
  }

  export default Charts;

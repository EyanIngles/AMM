import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import { useEffect } from "react";


import Loading from "./Loading";


const Charts = () => {

  const provider = useSelector(state => state.provider.connection)
  const tokens = useSelector(state => state.tokens.contracts)
  const amm = useSelector(state => state.amm.contract)
  const shares = useSelector(state => state.amm.shares)

  const dispatch = useDispatch()

    return (
      <div>Charts</div>
    );
  }

  export default Charts;

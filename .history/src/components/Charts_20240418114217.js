import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { loadAllSwaps } from '../store/interactions'


import Loading from "./Loading";


const Charts = () => {

  const provider = useSelector(state => state.provider.connection)
  const tokens = useSelector(state => state.tokens.contracts)
  const amm = useSelector(state => state.amm.contract)
  const swaps = useSelector(state => state.amm.swaps)
  const shares = useSelector(state => state.amm.shares)

  const dispatch = useDispatch()

  useEffect(() => {
    if(provider && amm) {
    loadAllSwaps(provider, amm, dispatch)
    }
  }, [provider, amm, dispatch]);
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>transaction Hash</th>
            <th>Token Give</th>
            <th>Amount Give</th>
            <th>Token Get</th>
            <th>User</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {swaps && swaps.map((swap, index) => (
        <tr key={index}>
          <td>transaction Hash</td>
          <td>Token Give</td>
          <td>Amount Give</td>
          <td>Token Get</td>
          <td>User</td>
          <td>Time</td>
        </tr>
          ))}

        </tbody>
      </Table>
    );
  }

  export default Charts;

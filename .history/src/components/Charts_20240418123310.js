import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import Chart from 'react-apexcharts'
import { loadAllSwaps } from '../store/interactions'


import Loading from "./Loading";

const STATE = {
  options: {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]
};

const Charts = () => {

  const provider = useSelector(state => state.provider.connection)
  const tokens = useSelector(state => state.tokens.contracts)
  const symbols = useSelector(state => state.tokens.symbols)

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
      <div>
        <Chart
              options={STATE.options}
              series={STATE.series}
              type="bar"
              width="1000"
            />
        <hr></hr>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>transaction Hash</th>
            <th>Token Give</th>
            <th>Amount Give</th>
            <th>Token Get</th>
            <th>Amount Get</th>
            <th>User</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {swaps && swaps.map((swap, index) => (
        <tr key={index}>
          <td>{swap.hash.slice(0,5) + '...' + swap.hash.slice(61,66)}</td>
          <td>{swap.args.tokenGive === tokens[0].address ? symbols[0] : symbols[1]}</td>
          <td>{ethers.utils.formatEther(swap.args.tokenGiveAmount)}</td>
          <td>{swap.args.tokenGet === tokens[0].address ? symbols[0] : symbols[1]}</td>
          <td>{ethers.utils.formatEther(swap.args.tokenGetAmount)}</td>
          <td>{swap.args.user.slice(0,5) + '...' + swap.args.user.slice(38,42)}</td>
          <td>{
                    new Date(Number(swap.args.timestamp.toString() + '000'))
                    .toLocaleDateString(
                      undefined,
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                      }
                    )
                }
          </td>
        </tr>
          ))}

        </tbody>
      </Table>
      </div>
    );
  }

  export default Charts;

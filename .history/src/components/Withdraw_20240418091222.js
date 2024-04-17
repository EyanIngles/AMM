import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadshares, removeLiquidity } from "../store/interactions";
import { ethers } from "ethers";
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownButton from "react-bootstrap/DropdownButton";
import Loading from './Loading';
import Alert from "./Alert";


const Withdraw = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [amount, setAmount] = useState(0)

  const provider = useSelector(state => state.provider.connection)
  const account = useSelector(state => state.provider.account)

  const tokens = useSelector(state => state.tokens.contracts)
  const amm = useSelector(state => state.amm.contract)
  const balances = useSelector(state => state.tokens.balances)
  const shares = useSelector(state => state.amm.shares)

  const isWithdrawing = useSelector(state => state.amm.withdrawing.isWithdrawing)
  const isSuccess = useSelector(state => state.amm.withdrawing.isSuccess)
  const transactionHash = useSelector(state => state.amm.withdrawing.transactionHash)


  const dispatch = useDispatch()


  const withdrawHandler = async (e) => {
    e.preventDefault()
    setShowAlert(false)

    const _shares = ethers.utils.parseEther(amount.toString())
    await removeLiquidity(provider, amm, _shares, dispatch)


    console.log("withdraw handler...", amount)
    setShowAlert(true)

  }
    return (
     <div>
        <Card style ={{ maxWidth: '450px' }} className="mx-auto px-4">
            {account ?  (
                <Form onSubmit={withdrawHandler} style={{ maxWidth: '450px', margin: '50px auto' }}>
                    <Row className='my-3'>
                        <div className="d-flex justify-content-between">
                            <Form.Label><strong>Input:</strong></Form.Label>
                            <Form.Text muted> Shares: {shares} </Form.Text>
                        </div>
                        <InputGroup>
                            <Form.Control type="number"
                            placeholder="0"
                            min='0.0'
                            step='any'
                            id="shares"
                            onChange={(e) => setAmount(e.target.value)}></Form.Control>
                            <InputGroup.Text style={{ width: "100px"}} className="justify-content-center">Shares</InputGroup.Text>
                        </InputGroup>
                    </Row>
                    <Row className="my-3">
                        <Button type='submit'>Withdraw</Button>
                    </Row>
                    <hr/>
                    <Row>
                      <p><strong>Dap Balance:</strong> {balances[0]}</p>
                      <p><strong>Ease Balance:</strong> {balances[1]}</p>
                    </Row>
                </Form>
            ) : (
                <p
                className="d-flex justify-content-center align-items-center"
                style={{ height: '300px' }} >
                    Please Connect Wallet.
                </p>
            )}
        </Card>
        {isWithdrawing ? (
        <Alert
          message={'Withdrawing Pending...'}
          transactionHash={null}
          variant={'info'}
          setShowAlert={setShowAlert}
        />
      ) : isSuccess && showAlert ? (
        <Alert
          message={'Withdraw Successful'}
          transactionHash={transactionHash}
          variant={'success'}
          setShowAlert={setShowAlert}
        />
      ) : !isSuccess && showAlert ? (
        <Alert
          message={'Withdraw Failed'}
          transactionHash={null}
          variant={'danger'}
          setShowAlert={setShowAlert}
        />
      ) : (
        <></>
      )}
    </div>
    );
  }


  export default Withdraw;

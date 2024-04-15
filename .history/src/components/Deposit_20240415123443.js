import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { swap, loadBalances } from "../store/interactions";
import { ethers } from "ethers";
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Loading from './Loading';
import Alert from "./Alert";


const Deposit = () => {
  const [price, setPrice] = useState(0)
  const [showAlert, setShowAlert] = useState(false)
  const [inputToken, setInputToken] = useState(null)
  const [outputToken, setOutputToken] = useState(null)
  const [inputAmount, setInputAmount] = useState(0)
  const [outputAmount, setOutputAmount] = useState(0)


const account = useSelector(state => state.provider.account)

const tokens = useSelector(state => state.tokens.contracts)
const symbols = useSelector(state => state.tokens.symbols)
const balances = useSelector(state => state.tokens.balances)
const provider = useSelector(state => state.provider.connection)

const amm = useSelector(state => state.amm.contract)
const isSwapping = useSelector(state => state.amm.swapping.isSwapping)
const isSuccess = useSelector(state => state.amm.swapping.isSuccess)
const transactionHash = useSelector(state => state.amm.swapping.transactionHash)

const dispatch = useDispatch()

    return (
      <div>Deposit</div>
    );
  }
  <div>
  <Card style ={{ maxWidth: '450px' }} className="mx-auto px-4">
            {account ?  (
                <Form onSubmit={swapHandler} style={{ maxWidth: '450px', margin: '50px auto' }}>
                    <Row className='my-3'>
                        <div className="d-flex justify-content-between">
                            <Form.Label><strong>Input:</strong></Form.Label>
                            <Form.Text muted> Balance: {inputToken === 'Dapp' ? (
                                balances[0]
                            ) : inputToken === 'Ease' ? (
                                balances[1]
                            ) : 0 }</Form.Text>
                        </div>
                        <InputGroup>
                            <Form.Control type="number"
                            placeholder="0.0"
                            min='0.0'
                            step='any'
                            onChange={(e) => inputHandler(e)}
                            disabled={!inputToken}>
                            </Form.Control>
                            <DropdownButton
                        vairant='outline-secondary'
                        title={inputToken ? inputToken : "Select Token"}>
                            <DropdownItem onClick={(e) => setInputToken(e.target.innerHTML)}>Dapp</DropdownItem>
                            <DropdownItem onClick={(e) => setInputToken(e.target.innerHTML)}>Ease</DropdownItem>
                        </DropdownButton>
                        </InputGroup>
                    </Row>
                    <Row className="my-4">
                    <div className="d-flex justify-content-between">
                            <Form.Label><strong>Output:</strong></Form.Label>
                            <Form.Text muted> Balance: {outputToken === 'Dapp' ? (
                                balances[0]
                            ) : outputToken === 'Ease' ? (
                                balances[1]
                            ) : 0 }</Form.Text>
                        </div>
                        <InputGroup>
                            <Form.Control type="number"
                            placeholder="0.0"
                            value={ outputAmount === 0 ? "" : outputAmount }
                            disabled>
                            </Form.Control>
                            <DropdownButton
                        vairant='outline-secondary'
                        title={outputToken ? outputToken : "Select Token"}>
                            <DropdownItem onClick={(e) => setOutputToken(e.target.innerHTML)}>Dapp</DropdownItem>
                            <DropdownItem onClick={(e) => setOutputToken(e.target.innerHTML)}>Ease</DropdownItem>
                        </DropdownButton>
                        </InputGroup>
                    </Row>
                    <Row className="my-3">
                        {<></> ? (<Loading></Loading>) : (
                        <Button type='submit'>Swap</Button>
                        ) }


                        <Form.Text muted>
                            Exchange Rate: {price}
                        </Form.Text>
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
        </div>


  export default Deposit;
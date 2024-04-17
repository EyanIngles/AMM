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

const account = "0x012..."
const Deposit = () => {
  const [price, setPrice] = useState(0)
  const [showAlert, setShowAlert] = useState(false)
  const [inputToken, setInputToken] = useState(null)
  const [outputToken, setOutputToken] = useState(null)
  const [inputAmount, setInputAmount] = useState(0)
  const [outputAmount, setOutputAmount] = useState(0)


  const provider = useSelector(state => state.provider.connection)
  const account = useSelector(state => state.provider.account)

  const tokens = useSelector(state => state.tokens.contracts)
  const symbols = useSelector(state => state.tokens.symbols)
  const balances = useSelector(state => state.tokens.balances)



const dispatch = useDispatch()

    return (
        <div>
        <Card style ={{ maxWidth: '450px' }} className="mx-auto px-4">
            {account ?  (
                <Form onSubmit={""} style={{ maxWidth: '450px', margin: '50px auto' }}>
                    <Row>
                      <Form.Text muted> Balance: {balances[0]} </Form.Text>
                        <InputGroup>
                            <Form.Control type="number"
                            placeholder="0.0"
                            min='0.0'
                            step='any'
                            id="token1">
                            </Form.Control>
                            <InputGroup.Text style={{ width: "100px" }} className="justify-content-center">
                                { symbols && symbols[0]}
                            </InputGroup.Text>
                        </InputGroup>
                    </Row>
                    <Row className="my-3">
                        <Form.Text muted> Balance: {balances[1]} </Form.Text>
                        <InputGroup>
                            <Form.Control type="number"
                            placeholder="0.0"
                            step='any'
                            id="token2">
                            </Form.Control>
                            <InputGroup.Text style={{ width: "100px" }} className="justify-content-center"></InputGroup.Text>
                        </InputGroup>
                    </Row>
                    <Row className="my-3">
                      <Button type='submit'>deposit</Button>
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

);
}
  export default Deposit;
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


//const account = useSelector(state => state.provider.account)



const dispatch = useDispatch()

    return (
        <div>
        <Card style ={{ maxWidth: '450px' }} className="mx-auto px-4">
            {account ?  (
                <Form onSubmit={""} style={{ maxWidth: '450px', margin: '50px auto' }}>
                    <Row className='my-3'>
                        <div className="d-flex justify-content-between">
                            <Form.Label><strong>Input:</strong></Form.Label>
                            <Form.Text muted> Balance: </Form.Text>
                        </div>
                        <InputGroup>
                            <Form.Control type="number"
                            placeholder="0.0"
                            min='0.0'
                            step='any'>
                            </Form.Control>
                            <DropdownButton
                        vairant='outline-secondary'
                        title={"Select Token"}>
                            <DropdownItem >Dapp</DropdownItem>
                            <DropdownItem >Ease</DropdownItem>
                        </DropdownButton>
                        </InputGroup>
                    </Row>
                    <Row className="my-4">
                    <div className="d-flex justify-content-between">
                            <Form.Label><strong>Output:</strong></Form.Label>
                            <Form.Text muted> Balance: </Form.Text>
                        </div>
                        <InputGroup>
                            <Form.Control type="number"
                            placeholder="0.0"
                            disabled>
                            </Form.Control>
                            <DropdownButton
                        vairant='outline-secondary'
                        title={"Select Token"}>
                            <DropdownItem >Dapp</DropdownItem>
                            <DropdownItem >Ease</DropdownItem>
                        </DropdownButton>
                        </InputGroup>
                    </Row>
                    <Button type='submit'>deposit</Button>

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
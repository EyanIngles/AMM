import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLiquidity, loadBalances } from "../store/interactions";
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

  const provider = useSelector(state => state.provider.connection)
  const account = useSelector(state => state.provider.account)


  const withdrawHandler = async (e) => {
    e.preventDefault()


    console.log("withdraw handler...")

  }
    return (
     <div>
        <Card style ={{ maxWidth: '450px' }} className="mx-auto px-4">
            {account ?  (
                <Form onSubmit={withdrawHandler} style={{ maxWidth: '450px', margin: '50px auto' }}>
                    <Row className='my-3'>
                        <div className="d-flex justify-content-between">
                            <Form.Label><strong>Input:</strong></Form.Label>
                            <Form.Text muted> shares: {0} </Form.Text>
                        </div>
                        <InputGroup>
                            <Form.Control type="number"
                            placeholder="0"
                            min='0.0'
                            step='any'
                            id="shares"></Form.Control>
                            <InputGroup.Text style={{ width: "100px"}}></InputGroup.Text>
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
                        vairant='outline-secondary'>
                            <DropdownItem >Dapp</DropdownItem>
                            <DropdownItem >Ease</DropdownItem>
                        </DropdownButton>
                        </InputGroup>
                    </Row>
                    <Row className="my-3">
                        <Button type='submit'>Swap</Button>
                        <Form.Text muted>
                            Exchange Rate:
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
    );
  }


  export default Withdraw;

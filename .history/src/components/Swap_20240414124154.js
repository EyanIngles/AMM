import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const Swap = () => {
    const [price, setPrice] = useState(0)
    const [inputToken, setInputToken] = useState(null)
    const [outputToken, setOutputToken] = useState(null)


  const account = useSelector(state => state.provider.account)
  const tokens = useSelector(state => state.tokens.contracts)
  const amm = useSelector(state => state.amm.contract)

  const inputHandler = async (e) => {
    if (!inputToken || !outputToken) {
        window.alert('Please select token')
        return
    }
    if (inputToken === outputToken) {
        window.alert('Invalid token pair')
        return
    }
  }

  const getPrice = async () => {
    if (inputToken === outputToken) {
        setPrice(0)
        return
    }
    if (inputToken === 'Dapp') {
        setPrice(await amm.token1Balance() / await amm.token2Balance())
    } else {
        setPrice(await amm.token2Balance() / await amm.token1Balance())
    }
    console.log({ inputToken, outputToken})
  }

  useEffect(() => {
    if(inputToken && outputToken) {
        getPrice()
    }
  }, [inputToken, outputToken]);

  return (
    <div>
        <Card style ={{ maxWidth: '450px' }} className="mx-auto px-4">
            {account ?  (
                <Form style={{ maxWidth: '450px', margin: '50px auto' }}>
                    <Row className='my-3'>
                        <div className="d-flex justify-content-between">
                            <Form.Label><strong>Input:</strong></Form.Label>
                            <Form.Text muted> Balance:</Form.Text>
                        </div>
                        <InputGroup>
                            <Form.Control type="number"
                            placeholder="0.0"
                            min='0.0'
                            step='any'
                            onChange={(e) => }
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
                            <Form.Text muted> Balance:</Form.Text>
                        </div>
                        <InputGroup>
                            <Form.Control type="number"
                            placeholder="0.0"
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
                        <Button type='submit'>Swap</Button>
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
  );
}


export default Swap;

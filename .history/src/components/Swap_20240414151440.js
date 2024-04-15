import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { swap } from "../store/interactions";
import { ethers } from "ethers";
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Spinner from "react-bootstrap/Spinner";

const Swap = () => {
    const [price, setPrice] = useState(0)
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

  const dispatch = useDispatch()

  const inputHandler = async (e) => {
    if (!inputToken || !outputToken) {
        window.alert('Please select token')
        return
    }
    if (inputToken === outputToken) {
        window.alert('Invalid token pair')
        return
    }
    if (inputToken === 'Dapp') {
        setInputAmount(e.target.value)
        const _token1Amount = ethers.utils.parseUnits(e.target.value, 'ether')
        const result = await amm.calculateToken1Swap(_token1Amount)
        const _token2Amount = ethers.utils.formatUnits(result.toString(), 'ether')

        setOutputAmount(_token2Amount.toString())
    } else {
        setInputAmount(e.target.value)

        const _token2Amount = ethers.utils.parseUnits(e.target.value, 'ether')
        const result = await amm.calculateToken2Swap(_token2Amount)
        const _token1Amount = ethers.utils.formatUnits(result.toString(), 'ether')

        setOutputAmount(_token1Amount.toString())
    }
  }

  const swapHandler = async (e) => {
    e.preventDefault()

    if (inputToken === outputToken) {
        window.alert("Invalid Token Pair")
        return
    }

    const _inputAmount = ethers.utils.parseUnits(inputAmount, 'ether')
    if (inputToken === "Dapp") {
        await swap(provider, amm, tokens[0], inputToken, _inputAmount, dispatch)
    } else {
        await swap(provider, amm, tokens[1], inputToken, _inputAmount, dispatch)
    }
  }

  const getPrice = async () => {
    if (inputToken === outputToken) {
        setPrice(0)
        return
    }
    if (inputToken === 'Dapp') {
        setPrice(await amm.token2Balance() / await amm.token1Balance())
    } else {
        setPrice(await amm.token1Balance() / await amm.token2Balance())
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
                        {isSwapping ? (<Spinner className={{'my-3'}}animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                            </Spinner>) : (
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
  );
}


export default Swap;

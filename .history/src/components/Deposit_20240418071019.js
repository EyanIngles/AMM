import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLiquidity, loadBalances } from "../store/interactions";
import { ethers } from "ethers";
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Loading from './Loading';
import Alert from "./Alert";

const Deposit = () => {
  const [showAlert, setShowAlert] = useState(false)

  const [token1Amount, setToken1Amount] = useState(0)
  const [token2Amount, setToken2Amount] = useState(0)


  const provider = useSelector(state => state.provider.connection)
  const account = useSelector(state => state.provider.account)

  const tokens = useSelector(state => state.tokens.contracts)
  const symbols = useSelector(state => state.tokens.symbols)
  const balances = useSelector(state => state.tokens.balances)

  const amm = useSelector(state => state.amm.contract)

  const isDepositing = useSelector(state => state.amm.depositing.isDepositing)
  const isSuccess = useSelector(state => state.amm.depositing.isSuccess)
  const transactionHash = useSelector(state => state.amm.depositing.transactionHash)


  const dispatch = useDispatch()


  const amountHandler = async (e) => {
    if (e.target.id === 'token1') {
      setToken1Amount(e.target.value)

      // Fetch value from chain
      const _token1Amount = ethers.utils.parseEther(e.target.value)
      const result = await amm.calculateToken2Deposit(_token1Amount)
      const _token2Amount = ethers.utils.formatEther(result.toString())

      setToken2Amount(_token2Amount)
    } else {
      setToken2Amount(e.target.value)

      // Fetch value from chain
      const _token2Amount = ethers.utils.parseEther(e.target.value)
      const result = await amm.calculateToken1Deposit(_token2Amount)
      const _token1Amount = ethers.utils.formatEther(result.toString())

      setToken1Amount(_token1Amount)
    }
  }

  const depositHandler = async (e) => {
    e.preventDefault()
    setShowAlert(false)

    console.log("deposit handler...")
    const _token1Amount = ethers.utils.parseEther(token1Amount)
    const _token2Amount = ethers.utils.parseEther(token2Amount)


    await addLiquidity(provider, amm, tokens, [_token1Amount, _token2Amount], dispatch)
    await loadBalances(amm, tokens, account, dispatch)

    setShowAlert(true)

  }


    return (
        <div>
        <Card style ={{ maxWidth: '450px' }} className="mx-auto px-4">
            {account ?  (
                <Form onSubmit={depositHandler} style={{ maxWidth: '450px', margin: '50px auto' }}>
                    <Row>
                      <Form.Text muted> Balance: {balances[0]} </Form.Text>
                        <InputGroup>
                            <Form.Control type="number"
                            placeholder="0.0"
                            min='0.0'
                            step='any'
                            id="token1"
                            onChange={(e) => amountHandler(e)}
                            value={token1Amount === 0 ? "" : token1Amount}>
                            </Form.Control>
                            <InputGroup.Text style={{ width: "100px" }} className="justify-content-center">
                                { symbols && symbols[0] }
                            </InputGroup.Text>
                        </InputGroup>
                    </Row>
                    <Row className="my-3">
                        <Form.Text muted> Balance: {balances[1]} </Form.Text>
                        <InputGroup>
                            <Form.Control type="number"
                            placeholder="0.0"
                            step='any'
                            id="token2"
                            onChange={(e) => amountHandler(e)}
                            value={token2Amount === 0 ? "" : token2Amount}
                            >
                            </Form.Control>
                            <InputGroup.Text style={{ width: "100px" }} className="justify-content-center">
                                { symbols && symbols[1] }
                            </InputGroup.Text>
                        </InputGroup>
                    </Row>
                    <Row className="my-3">
                    {isDepositing ? (<Loading></Loading>) : (
                        <Button type='submit'>Deposit</Button>
                        ) }
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
        {isDepositing ? (
        <Alert
          message={'Deposit Pending...'}
          transactionHash={null}
          variant={'info'}
          setShowAlert={setShowAlert}
        />
      ) : isSuccess && showAlert ? (
        <Alert
          message={'Deposit Successful'}
          transactionHash={transactionHash}
          variant={'success'}
          setShowAlert={setShowAlert}
        />
      ) : !isSuccess && showAlert ? (
        <Alert
          message={'Deposit Failed'}
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
  export default Deposit;
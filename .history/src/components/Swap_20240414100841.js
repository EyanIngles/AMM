import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const Swap = () => {
  const account = useSelector(state => state.provider.account)

  return (
    <div>
        <Card style ={{ maxWidth: '450px' }} className="mx-auto px-4">
            {account ?  (
                <Form style={{ maxWidth: '450px', margin: '50px auto' }}>
                    <Row className='my-3'>
                        <div className="d-flex justify-content-between">
                            <Form.Label><strong>Input:</strong></Form.Label>
                            <Form.Text muted>Balance:</Form.Text>
                        </div>
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

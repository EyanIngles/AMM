import { useSelector } from "react-redux";
import { Form } from "react-router-dom"
import { Card } from "react-bootstrap"
const Swap = () => {
  const account = useSelector(state => state.provider.account)

  return (
    <div>
        <Card style ={{ maxWidth: '450px' }} className="mx-auto px-4">
            {account ?  (
                <div>Swap</div>
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

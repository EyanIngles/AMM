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
                <div>Please Connect Wallet</div>
            )}
        </Card>
    </div>
  );
}


export default Swap;

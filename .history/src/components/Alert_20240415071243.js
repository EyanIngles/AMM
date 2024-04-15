import { Alert as BoostrapAlert } from 'react-bootstrap';

const Alert = ({ message, transactionHash, variant, setShowAlert }) => {

    return(
        <BoostrapAlert
        variant={variant}
        onClose={() => setShowAlert(false)}
        dismissible
        className='alert'>
            <BoostrapAlert.Heading>{message}</BoostrapAlert.Heading>

            <hr/>

            {transactionHash && (
                <p>
                    {transactionHash.slice(0,6) + '...' + transactionHash.slice(60,66)}
                </p>
            )}
        </BoostrapAlert>
    )
}

export default Alert;
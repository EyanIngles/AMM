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
                    console.log({transactionHash})
                </p>
            )}
        </BoostrapAlert>
    )
}

export default Alert;
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

const Loading = () => {
    return (
        <div className='text-center my-5'>
            <Button variant="primary" disabled>
            <Spinner animation="border" role="status">
            </Spinner>
            <div>Loading...</div>
            </Button>
        </div>
    );
}

export default Loading

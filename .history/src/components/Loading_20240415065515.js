import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

const Loading = () => {
    return (
        <div className='text-center my-0'>
            <Button variant="primary" disabled>
            <Spinner animation="border" role="status" style={{ display:'block',
            margin: '0 auto'}}>
            </Spinner>
            <div>Loading...</div>
            </Button>
        </div>
    );
}

export default Loading

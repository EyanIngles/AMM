import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div className='text-center my-5'>
            <Button variant="primary" disabled>
            <Spinner animation="border" role="status">
            </Spinner>
            </Button>
        </div>
    );
}

export default Loading

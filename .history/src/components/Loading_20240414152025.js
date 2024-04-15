import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div className='text-center my-5'>
            <Spinner animation="border" role="status">
            
            </Spinner>
        </div>
    );
}

export default Loading

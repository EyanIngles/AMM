import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

const Loading = () => {
    return (
        <div className='text-center my-5'>
            <Spinner animation="border" role="status">
            <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
            </Spinner>
        </div>
    );
}

export default Loading

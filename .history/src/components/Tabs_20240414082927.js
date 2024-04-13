import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


const Tabs = () => {
    return (
      <Nav variant="pills" defaultActiveKey='/' className='justify-content-center my-4'>
        <LinkContainer to='/'>
            <Nav.Link>Swap</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/deposit'>
            <Nav.Link>Deposit</Nav.Link>
        </LinkContainer>
      </Nav>
    );
  }
  
  
  export default Tabs;
  
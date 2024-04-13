import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


const Tabs = () => {
    return (
      <Nav variant="pills" defaultActiveKey='/' className='justify-content-center my-4'>
        <LinkContainer>
            <Nav.link>
            </Nav.link>
        </LinkContainer>
      </Nav>
    );
  }
  
  
  export default Tabs;
  
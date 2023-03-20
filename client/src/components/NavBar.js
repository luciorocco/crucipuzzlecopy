import { Navbar, Col, Nav } from 'react-bootstrap';
import { PersonCircle,  Puzzle } from 'react-bootstrap-icons';
import { useHistory } from "react-router-dom";
import {LogoutButton} from './LoginForm'



function NavBar(props) {
let history = useHistory();


    return (
        <Navbar bg="info" variant="dark" expand="lg">
            <Col className="d-flex align-items-center" >
                <Puzzle size={30} color="#ffffff" className="mr-1 pointer" />
                <Navbar.Brand >CruciPuzzle</Navbar.Brand>
                <Nav.Link className='Navlink' onClick={()=> history.push("/")}> HOME</Nav.Link>
                <Nav.Link className='Navlink' onClick={()=>history.push("/hall_of_fame")}> BEST PLAYERS</Nav.Link>
                {props.loggedIn ? <Nav.Link className='Navlink' onClick={()=> history.push("/historyGame")}>HISTORY GAME </Nav.Link> :  ''}

            </Col>
            <Col className="d-flex justify-content-center" >
                <Puzzle size={30} color="#ffffff" className="mr-1" />    
            </Col>
            <Col className="d-flex justify-content-end align-items-center pointer" >
                <PersonCircle size={30} color="#ffffff" className="mr-3" onClick={()=> history.push("/login")}/>
                {props.loggedIn ? <LogoutButton doLogOut={props.doLogOut} /> :  ''}
            </Col>
        </Navbar>
    );
}

export default NavBar;
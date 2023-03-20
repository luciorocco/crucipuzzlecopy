import { useState } from 'react';
import { Row, Button, Form, Card, Container, Col, ListGroup } from 'react-bootstrap';
import { Puzzle, ChevronCompactRight } from 'react-bootstrap-icons';
import { useHistory } from "react-router-dom";




function Homepage(props) {
    let history = useHistory();
    return (
        <>

            {props.loggedIn || props.host ?
                <Row className="mt-5  justify-content-center">
                    <h1 > Choose The Difficulty</h1>

                </Row>
                :
                <Row className="mt-5  justify-content-center">
                    <h1 > Welcome To CruciPuzzle</h1>

                </Row>}
            <Container as={Col} sm={8} md={8} className="try-form mt-5">

                <div className="text-center puzzle-icon">
                    <Puzzle size={60}></Puzzle>
                </div>
                {props.loggedIn || props.host ?
                    <ListGroup variant="flush">
                        <Row className="mt-5  justify-content-center">
                            <Button className='homepage' size='lg' variant="outline-info"
                                onClick={() => { props.setDifficolta(1); history.push({ pathname: '/grid' }); }}
                            >4x6

                            </Button>
                        </Row>
                        <Row className="mt-5 justify-content-center">
                            <Button className='homepage' size='lg' variant="outline-info"
                                onClick={() => { props.setDifficolta(2); history.push({ pathname: '/grid' }); }}
                            >8x12</Button>
                        </Row>
                        <Row className="mt-5 justify-content-center">
                            <Button className='homepage' size='lg' variant="outline-info"
                                onClick={() => { props.setDifficolta(3); history.push({ pathname: '/grid' }); }}
                            >12x18</Button>
                        </Row>
                        <Row className="mt-5 justify-content-center">
                            <Button className='homepage' size='lg' variant="outline-info"
                                onClick={() => { props.setDifficolta(4); history.push({ pathname: '/grid' }); }}
                            >16x24</Button>
                        </Row>
                        <Row className="mt-5 justify-content-center">
                            <Button className='homepage' size='lg' variant="outline-info"
                                onClick={() => { props.setDifficolta(5); history.push({ pathname: '/grid' }); }}
                            >20x30</Button>
                        </Row>
                        

                    </ListGroup>
                    :
                    <ListGroup variant='flush'>
                        <Row className="mt-5 justify-content-center">
                            <Button className='homepage' size='lg' variant="outline-info"
                                onClick={() => props.setHost(true)}
                            >Play as a host</Button>
                        </Row>
                        <Row className="mt-5 justify-content-center">
                            <Button className='homepage' size='lg' variant="outline-info"
                                onClick={() => history.push({ pathname: '/login' })}
                            >Log In</Button>
                        </Row>
                    </ListGroup>

                }





            </Container>

        </>

    );
}

export default Homepage;
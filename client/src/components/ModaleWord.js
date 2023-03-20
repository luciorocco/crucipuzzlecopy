import { Modal, Button, ListGroup, Collapse, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Puzzle } from 'react-bootstrap-icons';

import API from '../API';

function ModaleWord(props) {
    let history = useHistory();



    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                

            >
                <Modal.Header className='modal-header-info' style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
                    <Modal.Title>SCORE <Puzzle className='mb-1'/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center classi'>
                        <h1>{props.totalPoint}</h1>
                    </div>

                </Modal.Body>
                <Modal.Footer >
                    <Col className='d-flex justify-content-center '>
                        <Button variant="info" onClick={() => { props.onHide();props.setDifficolta(0); history.push("/"); }}>
                            Try Again
                        </Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModaleWord;
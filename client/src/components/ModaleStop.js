import { Modal, Button, ListGroup, Col } from 'react-bootstrap';
import { ExclamationTriangle } from 'react-bootstrap-icons';




function ModaleStop(props) {


    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header 
                className='modal-header-info' 
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    <Modal.Title >Close Game <ExclamationTriangle className='mb-1'/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col className='d-flex justify-content-center '> <h3>Leave game. Are you sure?</h3></Col>
                </Modal.Body>
                <Modal.Footer>
                    <Col className='d-flex justify-content-center'>
                        <Button variant="info" onClick={props.onHide}>
                            NO
                        </Button>
                    </Col>
                    <Col className='d-flex justify-content-center'>
                        <Button variant="danger" onClick={() => { props.onHide(); props.setDirty(true); }}>
                            YES
                        </Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModaleStop;
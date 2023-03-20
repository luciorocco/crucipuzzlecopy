import {  Table, Container } from 'react-bootstrap';
import { AwardFill } from 'react-bootstrap-icons';




function HallOfFame(props) {
    return (
        <Container className='try-form'>
            <div className="text-center user-icon">
                <AwardFill size={60}></AwardFill>
            </div>
            <div className='text-center classi'>
                <h1> Classifica: </h1>
            </div>

            <Table striped bordered hover responsive >
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Point</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.classification.map((h, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{h.name}</td>
                                <td>{h.point}</td>

                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>

    );
}

export default HallOfFame;
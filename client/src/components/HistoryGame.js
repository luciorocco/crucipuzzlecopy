import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Joystick } from 'react-bootstrap-icons';
import API from "../API";




function HistoryGame(props) {
    const [history, setHistory] = useState([]);
    console.log(props.id);

    useEffect(() => {
        const call = async () => {
            try {
                let history = await API.getUserGames(parseInt(props.id));
                setHistory(history);
            } catch (e) {
                console.log(e);
            }
        }
        call();

    }, []);



    return (
        <>
            <Container fluid className="try-form" >
                <div className="text-center user-icon">
                    <Joystick size={60}></Joystick>
                </div>
                <div className='text-center classi'>
                    <h1> Games Played: </h1>
                </div>
                <OrderTable history={history} />
            </Container>
        </>

    );

}


function OrderTable(props) {


    return (
        <Table striped bordered hover responsive >
            <thead>
                <tr>
                    <th>Game</th>
                    <th>Date</th>
                    <th>Difficult</th>
                    <th>Point</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.history.map((h, index) => (
                        <tr key={index}>
                            <td>{`Game-${index + 1}`}</td>
                            <td>{h.date}</td>
                            <td>{h.difficult}</td>
                            <td>{h.point}</td>
                            <td>{h.duration}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}





export default HistoryGame;

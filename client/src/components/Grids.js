import { useState, useEffect } from 'react';
import { Row, Button, Container, Col, Badge, Spinner } from 'react-bootstrap';
import API from '../API';
import { DivideRow, CorrectLine, ClrBtn } from '../Logic';
import ModaleWord from './ModaleWord';
import ModaleStop from './ModaleStop';
import { useHistory } from "react-router-dom";


function Grids(props) {
    const [indexUno, setIndexUno] = useState(0);
    const [indexDue, setIndexDue] = useState(0);
    const [colorChange, setColorChange] = useState([]);
    const [word, setWord] = useState([]);
    const [time, setTime] = useState(parseInt(60));
    const [modal, setModal] = useState(false);
    const [modalStop, setModalStop] = useState(false);
    const [disable, setDisable] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [totalPoint, setTotalPoint] = useState(0);
    const [stop, setStop] = useState(false);


    let history = useHistory();


    const saveGame = async (sum) => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        let duration = 60 - time;

        if (props.loggedIn) {
            // add game in history game
            try {
                await API.createGame({ id_utente: props.id, date: today, difficult: props.difficolta, point: sum, duration: duration, name: props.name });
                //Insert or update 
                props.classification.some(s => s.id_user == props.id) ? await API.updateClassification(props.id, sum) :
                    await API.createClassificatio({ point: sum, id_user: props.id, name: props.name });
                    props.setMessage({ msg: `Your game has been saved with a total score : ${sum}!`, type: 'success' });
                    setTimeout(() => {
                        props.setMessage('');
                    }, 3000);
            } catch (e) {
                console.log(e);
            }
            props.setUpdate(true);
        }

    }


    const calculatePoint = () => {
        let sum = 0;
        for (let i = 0; i < word.length; i++) {
            sum = sum + word[i].length;

        }
        sum = sum * parseInt(props.difficolta);
        setTotalPoint(sum);
        saveGame(sum);

    }





    useEffect(() => {
        const tick = () => {


            if (time === 0 || dirty) {
                setModalStop(false);
                setDisable(true);
                setModal(true);
                calculatePoint();
                clearInterval(timerId);

            } else if (!stop) {
                setTime((e) => e - 1);
            } else {
                clearInterval(timerId);
            }
        };

        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);

    }, [time]);

    const handleSubmit = (event) => {
        let value = event.target.id;
        if (indexUno === 0) {
            setIndexUno(value);
        } else {
            setIndexDue(value);

        }

    }

    useEffect(() => {

        const check = async (parola) => {
            let wrd = await API.getWord(parola[0]);


            if (wrd) {
                let w = word.includes(parola[0]); // verifico che la parola sia diversa

                if (!w) {
                    setWord((e) => [...e, parola[0]]);
                    setColorChange((e) => e.concat(parola[1].filter(x => !e.includes(x)))); // concateno e verifo che non ci siano due indici uguali!!
                    props.setMessage({ msg: parola[0], type: 'success' });
                    setTimeout(() => {
                        props.setMessage('');
                    }, 1500);
                } else {
                    props.setMessage({ msg: `Wrong already found, ${parola[0]}!`, type: 'danger' });
                    setTimeout(() => {
                        props.setMessage('');
                    }, 1500);


                }

            } else {
                props.setMessage({ msg: `Wrong word, ${parola[0]}!`, type: 'danger' });
                setTimeout(() => {
                    props.setMessage('');
                }, 1500);

            }

        }

        const checkIndex = () => {
            let correct = CorrectLine(props.lettere, indexUno, indexDue, props.difficolta);
            if (correct != false) {
                let parola = ClrBtn(correct, props.lettere, indexUno, indexDue, props.difficolta);
                check(parola);

            } else {
                props.setMessage({ msg: `Wrong direction!`, type: 'danger' });
                setTimeout(() => {
                    props.setMessage('');
                }, 1500);

            }

            setIndexUno(0);
            setIndexDue(0);


        };
        if (indexDue != 0) { checkIndex(); };

    }, [indexDue]);


    return (


        <Container as={Col} md={12} className="try-form  mt-5">

            <div className="text-end counter-icon">
                <h1>
                    <Badge bg="secondary">Timer: {time}</Badge>
                </h1>
            </div>
            <div className="text-center puzzle-icon">
                <h1>{props.write}</h1>
            </div>

            <div className='text-center'>
                <Celle lettere={props.lettere} colorChange={colorChange} disable={disable} handleSubmit={handleSubmit} difficolta={props.difficolta} />
            </div>
            <div className='text-center'>
                <Button className='mt-3' variant='danger' disabled={disable} onClick={() => { setModalStop(true); setStop(true) }}> STOP GAME </Button>
            </div>
            <div className='d-flex justify-content-start'>
                <Button className='mt-3' variant='info' onClick={() => { props.setDifficolta(0); history.push("/") }}>  BACK </Button>
            </div>

            <ModaleWord
                show={modal}
                onHide={() => setModal(false)}
                id={props.id}
                difficult={props.difficolta}
                time={time}
                totalPoint={totalPoint}
                loggedIn={props.loggedIn}
                setDifficolta={props.setDifficolta}
            />
            <ModaleStop
                show={modalStop}
                onHide={() => { setModalStop(false); setStop(false); setTime(time - 1) }}
                saveGame={saveGame}
                setDirty={setDirty}
            />

        </Container>

    );
}


function Celle(props) {


    return (
        <>


            {props.lettere.map((element, index) => {
                let buttonStyle = props.colorChange.includes(index + 1);


                if (DivideRow(index, props.difficolta)) {
                    return (
                        [<Row key={index + 600} />
                            ,
                        <Button
                            key={index}
                            disabled={props.disable}
                            style={!buttonStyle ? { color: "#5bc0de", background: '#ffffff', width: 40 }
                                :
                                { color: "#00005c", width: 40, boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }
                            }
                            className='ml-2 mt-2'
                            id={index + 1}
                            onClick={(e) => props.handleSubmit(e)}
                        >
                            {element}
                        </Button>]

                    );
                } else {
                    return (
                        <Button
                            key={index}
                            disabled={props.disable}
                            style={!buttonStyle ? { color: "#5bc0de", background: '#ffffff', width: 40 }
                                :
                                { color: "#00005c", width: 40, boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
                            className='ml-2 mt-2'
                            id={index + 1}
                            onClick={(e) => props.handleSubmit(e)}
                        >
                            {element}
                        </Button>);
                }
            })
            }

        </>

    );

}

export default Grids;
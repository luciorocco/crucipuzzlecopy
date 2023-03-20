import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Switch, Route,Redirect,  useHistory ,BrowserRouter as Router } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import NavBar from './components/NavBar';
import Homepage from './components/Homepage';
import Grids from './components/Grids';
import HistoryGame from './components/HistoryGame';
import HallOfFame from './components/HallOfFame';
import API from './API';
import { randomAtoZ } from './Logic';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [host, setHost] = useState(false);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [dirty, setDirty] = useState(false);
  const [difficolta, setDifficolta] = useState(0);
  const [lettere, setLettere] = useState([]);
  const [message, setMessage] = useState('');
  const [classification, setClassification] = useState([]);
  const [arrLettere, setArrLettere] = useState([]);
  const [update, setUpdate] = useState(false);
  const [write, setWrite] = useState('');

  


  const routerHistory = useHistory();



  useEffect(() => {
    const call = async () => {
      let classi = await API.getClassification();
      classi.sort((a,b) => b.point - a.point).slice(0,5);
      console.log(classi);
      setClassification(classi);
      setUpdate(false);
    }
    call();

  }, [update]);

  useEffect(() => {
    const call = async () => {
      let letFre = await API.getLetter();
      setArrLettere(letFre);
    }
    call();

  }, []);


  useEffect(() => {
    const call = async () => {
      if (lettere.length != 0) {
        setLettere([]);
      }
      switch (difficolta) {

        case 1:
          for (let i = 0; i < 24; i++) {
            let letter = randomAtoZ(arrLettere);
            setLettere(old => [...old, letter]);


          }
          setWrite('4x6');

          break;
        case 2:
          for (let i = 0; i < 96; i++) {
            let letter = randomAtoZ(arrLettere);
            setLettere(old => [...old, letter]);


          }
          setWrite('8x12');

          break;
        case 3:
          for (let i = 0; i < 216; i++) {
            let letter = randomAtoZ(arrLettere);
            setLettere(old => [...old, letter]);

          }
          setWrite('12x18');

          break;
        case 4:
          for (let i = 0; i < 384; i++) {
            let letter = randomAtoZ(arrLettere);
            setLettere(old => [...old, letter]);

          }
          setWrite('16x24');

          break;
        case 5:
          for (let i = 0; i < 600; i++) {
            let letter = randomAtoZ(arrLettere);
            setLettere(old => [...old, letter]);

          }
          setWrite('20x30');

          break;
        default:
          setLettere([]);
      }
    }
    call();

  }, [difficolta]);

  



  const doLogIn = async (credentials) => {
    try {
      const u = await API.logIn(credentials, routerHistory);
      setLoggedIn(true);
      setDirty(true);
      setId(u.id);
      setName(u.name);
      setHost(false);
      setMessage({ msg: `Welcome, ${u.name}!`, type: 'success' });
      setTimeout(() => {
        setMessage('');
      }, 3000);

    } catch (err) {
      setMessage({ msg: 'errore', type: 'danger' });
      setTimeout(() => {
        setMessage('');
      }, 3000);
      console.log(err)
    }

  }

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setId(0);
    setMessage({msg: 'Successfully logged out!', type:'success'})
    setTimeout(() => {
      setMessage('');
    }, 3000);

  }


  return (
    <Router >
      <NavBar loggedIn={loggedIn} doLogOut={doLogOut}  />
      {
        <Col className='d-flex justify-content-center'>
          <Alert variant={message.type} onClose={()=> setMessage('')} >{message.msg} </Alert>
        </Col>
      }
      <Switch>
        <Route exact path="/">
          <Homepage  setDifficolta={setDifficolta} host={host} loggedIn={loggedIn} setHost={setHost} classification={classification} />
        </Route>
        <Route exact path="/login">
          {!loggedIn?<LoginForm loggedIn={loggedIn} doLogIn={doLogIn} /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/hall_of_fame">
          <HallOfFame classification={classification} />
        </Route>
        <Route exact path="/grid">
          {loggedIn || host ? <Grids setDifficolta={setDifficolta} write={write} setMessage={setMessage} setUpdate={setUpdate} name={name} loggedIn={loggedIn} difficolta={difficolta} lettere={lettere} id={id} classification={classification} setClassification={setClassification} /> : <Homepage setDifficolta={setDifficolta} host={host} loggedIn={loggedIn} setHost={setHost} classification={classification} />}
        </Route>
        <Route exact path="/historyGame">
          {loggedIn ? <HistoryGame id={id} /> : <LoginForm doLogIn={doLogIn} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

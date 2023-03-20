
import { Row, Button, Form,  Container, Col } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { useState } from 'react';

function LoginForm(props) {
    const { doLogIn } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === '' || password === '') {
            setInvalidEmail(username === '');
            setInvalidPassword(password === '');
        } else {
            const credentials = { username, password };
            doLogIn(credentials);
        }
    };

    const handleChange = (event) => {
        if (event.target.id === 'email') {
            setUsername(event.target.value);
            setInvalidEmail(event.target.value === '');
        } else if (event.target.id === 'password') {
            setPassword(event.target.value);
            setInvalidPassword(event.target.value === '');
        }
    };

    return (

        <Container as={Col} sm={8} md={8} className="try-form mt-5">
            <div className="text-center user-icon">
                <PersonCircle size={60}></PersonCircle>
            </div>
            <div className="login">
                <Row className="mt-5 justify-content-center">

                    <Form>
                        <Form.Group className="text-left mb-4" controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control isInvalid={invalidEmail} placeholder="Enter Email" type="email" value={username} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">Please insert email.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="text-left mb-4" controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control isInvalid={invalidPassword} placeholder="Enter Password" type="password" value={password} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">Please insert password.</Form.Control.Feedback>
                        </Form.Group>
                        <Button className="btn-lg btn-block" style={{ color: "#5bc0de", backgroundColor: "#ffffff" }} onClick={handleSubmit} >Log In</Button>
                    </Form>

                </Row>
            </div>
        </Container>
    );
}

function LogoutButton(props) {
    return (
        <Button variant="outline-light" onClick={props.doLogOut}>Logout</Button>
    )
  }

export  {LoginForm, LogoutButton};
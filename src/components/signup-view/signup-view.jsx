import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import '../../index.scss';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validierung der Mindestlänge für den Benutzernamen und das Passwort
    if (username.length < 3) {
      setErrorMessage('Username must be at least 3 characters long');
      return;
    }
    if (password.length < 3) {
      setErrorMessage('Password must be at least 3 characters long');
      return;
    }

    // Daten für das Backend vorbereiten
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthdate: birthdate,
    };

    fetch('https://kraftflix-api-d019e99d109c.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Signup successful');
          window.location.reload();
        } else {
          response.json().then((error) => {
            console.error('Signup failed:', error);
            setErrorMessage(
              'Signup failed: ' + (error.message || 'Unknown error')
            );
          });
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
        setErrorMessage('Signup failed: Network error');
      });
  };

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title className="kAuth-title">Signup</Card.Title>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* USERNAME */}
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (e.target.value.length >= 3) {
                  setErrorMessage('');
                }
              }}
              required
              minLength="3"
            />
          </Form.Group>
          {/* PASSWORD */}
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length >= 3) {
                  setErrorMessage('');
                }
              }}
              required
              minLength="3"
            />
          </Form.Group>
          {/* EMAIL */}
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          {/* BIRTHDATE */}
          <Form.Group controlId="formBirthdate">
            <Form.Label>Birthdate:</Form.Label>
            <Form.Control
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            className="mt-3 custom-button"
            variant="outline-custom"
            type="submit"
            size="sm"
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

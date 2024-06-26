import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, Alert } from 'react-bootstrap';

export const UpdateUserForm = ({ user, token, onUpdateUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState(user.Birthdate);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.length < 3) {
      setErrorMessage('Username must be at least 3 characters long');
      return;
    }
    if (password && password.length < 3) {
      setErrorMessage('Password must be at least 3 characters long');
      return;
    }

    const data = {
      Username: username,
      Email: email,
      Password: password || undefined,
      Birthdate: birthdate,
    };

    fetch(
      `https://kraftflix-api-d019e99d109c.herokuapp.com/users/${user.Username}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
      })
      .then((updatedUser) => {
        setSuccessMessage('Profile updated successfully');
        setErrorMessage('');
        onUpdateUser(updatedUser);
      })
      .catch((error) => {
        console.error('Update failed:', error);
        setErrorMessage('Update failed: ' + (error.message || 'Unknown error'));
        setSuccessMessage('');
      });
  };

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title className="kAuth-title">Update Profile</Card.Title>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBirthdate">
            <Form.Label>Birthdate:</Form.Label>
            <Form.Control
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
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

UpdateUserForm.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
};

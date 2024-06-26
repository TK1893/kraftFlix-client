import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const DeleteUser = ({ username, token, onUserDeleted }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleDeleteUser = () => {
    fetch(
      `https://kraftflix-api-d019e99d109c.herokuapp.com/users/${username}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert('Your account has been deleted successfully');
          localStorage.clear();
          onUserDeleted(); // Trigger the event when user is deleted
        } else {
          response.json().then((error) => {
            throw new Error(error.message);
          });
        }
      })
      .catch((error) => {
        console.error('Failed to delete account:', error);
        setErrorMessage(
          'Failed to delete account: ' + (error.message || 'Unknown error')
        );
      });
  };

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title className="kAuth-title">Deregister Account</Card.Title>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Button
          className="delete-movie-button"
          variant="danger"
          onClick={handleDeleteUser}
        >
          Deregister
        </Button>
      </Card.Body>
    </Card>
  );
};

DeleteUser.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onUserDeleted: PropTypes.func.isRequired, // New prop for handling user deletion
};

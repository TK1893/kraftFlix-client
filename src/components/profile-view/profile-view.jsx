import React, { useState } from 'react';
import { Card, Container, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ProfileView = ({ user, favoriteMovies }) => {
  const [loading, setLoading] = useState(true);
  const [updatedFavoriteMovies, setUpdatedFavoriteMovies] =
    useState(favoriteMovies);
  const [errorMessage, setErrorMessage] = useState('');

  const formatBirthday = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleRemoveFromFavorites = (movieId) => {
    fetch(
      `https://kraftflix-api-d019e99d109c.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert('Removed from favorites successfully');
          setUpdatedFavoriteMovies(
            updatedFavoriteMovies.filter((movie) => movie._id !== movieId)
          );
        } else {
          response.json().then((error) => {
            console.error('Failed to remove from favorites:', error);
            setErrorMessage(
              'Failed to remove from favorites: ' +
                (error.message || 'Unknown error')
            );
          });
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
        setErrorMessage('Failed to remove from favorites: Network error');
      });
  };

  return (
    <Container fluid>
      <Card className="my-3">
        <Card.Body>
          <Card.Title className="kAuth-title">Profile</Card.Title>
          <Card.Text>
            <strong>Name:</strong> {user.Username}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> {user.Email}
          </Card.Text>
          <Card.Text>
            <strong>Birthdate:</strong> {formatBirthday(user.Birthdate)}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="my-3">
        <Card.Body>
          <Card.Title className="kAuth-title">Favorite Movies</Card.Title>
          <div className="d-flex flex-wrap">
            {updatedFavoriteMovies.map((movie) => (
              <Card className="m-2" key={movie._id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={movie.Imageurl} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Link to={`/movies/${encodeURIComponent(movie.ID)}`}>
                    <Button variant="primary">Details</Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={() => handleRemoveFromFavorites(movie._id)}
                  >
                    Delete from FavoriteList
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
          {errorMessage && (
            <Alert variant="danger" className="mt-3">
              {errorMessage}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

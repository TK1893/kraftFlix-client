import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

export const FavoriteMovies = ({
  user,
  token,
  favoriteMovies,
  onRemoveFavorite,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleRemoveFromFavorites = (movieId) => {
    fetch(
      `https://kraftflix-api-d019e99d109c.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert('Removed from favorites successfully');
          onRemoveFavorite(movieId);
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
    <Card className="my-3">
      <Card.Body>
        <Card.Title className="kAuth-title">Favorite Movies</Card.Title>
        <div className="d-flex flex-wrap">
          {favoriteMovies.map((movie) => (
            <Card
              className="m-2 karteS h-100"
              key={movie._id}
              style={{ width: '12rem' }}
            >
              <Link to={`/movies/${encodeURIComponent(movie.ID)}`}>
                <Card.Img variant="top" src={movie.Imageurl} />
              </Link>
              <Card.Body>
                <Card.Title className="karteS-title">{movie.Title}</Card.Title>
                {/* <Link to={`/movies/${encodeURIComponent(movie.ID)}`}>
                  <Button variant="primary">Details</Button>
                </Link> */}
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 delete-movie-button"
                  onClick={() => handleRemoveFromFavorites(movie._id)}
                >
                  Delete from Favorites
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
  );
};

FavoriteMovies.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  favoriteMovies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Imageurl: PropTypes.string,
    })
  ).isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
};

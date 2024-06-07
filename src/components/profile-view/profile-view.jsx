import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UpdateUserForm } from '../update-user-form/update-user-form';
import { DeleteUser } from '../delete-user/delete-user';
import { FavoriteMovies } from '../favorite-movies/favorite-movies';

export const ProfileView = ({ user, favoriteMovies }) => {
  const [updatedFavoriteMovies, setUpdatedFavoriteMovies] =
    useState(favoriteMovies);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const navigate = useNavigate();

  const handleRemoveFavorite = (movieId) => {
    setUpdatedFavoriteMovies(
      updatedFavoriteMovies.filter((movie) => movie._id !== movieId)
    );
  };

  const handleUpdateUser = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    window.location.reload();
  };

  const handleUserDeleted = () => {
    setIsUserDeleted(true);
  };

  // Redirect to login if user is deleted
  if (isUserDeleted) {
    navigate('/login', { replace: true });
    return null;
  }

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
            <strong>Birthdate:</strong> {user.Birthdate}
          </Card.Text>
          <Card.Text>
            <strong>Favorite Movies:</strong> {user.FavoriteMovies}
          </Card.Text>
        </Card.Body>
      </Card>
      <FavoriteMovies
        user={user}
        token={localStorage.getItem('token')}
        favoriteMovies={updatedFavoriteMovies}
        onRemoveFavorite={handleRemoveFavorite}
      />
      <UpdateUserForm
        user={user}
        token={localStorage.getItem('token')}
        onUpdateUser={handleUpdateUser}
      />
      <DeleteUser
        username={user.Username}
        token={localStorage.getItem('token')}
        onUserDeleted={handleUserDeleted}
      />
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  favoriteMovies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Imageurl: PropTypes.string,
    })
  ).isRequired,
};

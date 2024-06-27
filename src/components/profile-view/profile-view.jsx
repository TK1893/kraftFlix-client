import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UpdateUserForm } from '../update-user-form/update-user-form';
import { DeleteUser } from '../delete-user/delete-user';
import { FavoriteMovies } from '../favorite-movies/favorite-movies';
import './profile-view.scss';

export const ProfileView = ({ user, favoriteMovies }) => {
  const [updatedFavoriteMovies, setUpdatedFavoriteMovies] =
    useState(favoriteMovies);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

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
    navigate('/login'); // Redirect to login page
  };

  // Redirect to login if user is deleted
  useEffect(() => {
    if (isUserDeleted) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  }, [isUserDeleted, navigate]);

  if (!user) {
    return null; // or render a loading spinner or message
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Get the date part only (yyyy-MM-dd)
  };

  return (
    <Container fluid>
      <Card className="my-3">
        <Card.Body>
          <Card.Title className="karte-title">User</Card.Title>

          <Card.Text>
            <strong>Name:</strong> {user.Username}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> {user.Email}
          </Card.Text>
          <Card.Text>
            <strong>Birthdate:</strong> {formatDate(user.Birthdate)}
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

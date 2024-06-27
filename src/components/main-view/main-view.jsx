import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { DeleteUser } from '../delete-user/delete-user';
import { SearchBar } from '../search-bar/search-bar';
import '../movie-card/movie-card.scss';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://kraftflix-api-d019e99d109c.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Imageurl: movie.Imageurl,
          ID: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Featured: movie.Featured,
          Director: movie.Director,
          Genre: movie.Genre,
          Actors: movie.Actors,
          Year: movie.Year,
        }));
        setMovies(moviesFromApi);

        const favoriteMovies = moviesFromApi.filter(
          (m) => user && user.FavoriteMovies.includes(m._id)
        );
        setFavoriteMovies(favoriteMovies);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [token, user]);

  const addToFavorites = (movieId) => {
    fetch(
      `https://kraftflix-api-d019e99d109c.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert('Added to favorites successfully');
        } else {
          alert('Failed to add to favorites');
        }
      })
      .catch((error) => {
        console.error(
          'There was a problem with the addToFavorites operation:',
          error
        );
      });
  };

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Container>
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                      The list is empty!
                    </Col>
                  ) : (
                    <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                      <MovieView
                        movies={movies}
                        addToFavorites={addToFavorites}
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                      The list is empty!
                    </Col>
                  ) : (
                    <>
                      <Col
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={2}
                        style={{ marginBottom: '1em' }}
                      >
                        <SearchBar
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                        />
                      </Col>
                      {filteredMovies.map((movie) => (
                        <Col
                          key={movie.ID}
                          className="mb-4"
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          xl={2}
                        >
                          <MovieCard
                            movie={movie}
                            addToFavorites={addToFavorites}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <ProfileView user={user} favoriteMovies={favoriteMovies} />
              }
            />
            <Route
              path="/delete-user"
              element={
                <DeleteUser
                  username={user?.Username}
                  token={token}
                  onUserDeleted={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                    return <Navigate to="/login" />;
                  }}
                />
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

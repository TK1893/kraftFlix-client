import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/singnup-view';
import { Row, Col, Button, Container, Navbar, Nav } from 'react-bootstrap';
import '../../index.scss';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch('https://kraftflix-api-d019e99d109c.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
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
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setError(error.message);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleBrandClick = () => {
    setSelectedMovie(null);
  };

  return (
    <Container fluid>
      <Navbar bg="black" className="mb-5 mt-1">
        <Container>
          <Navbar.Brand
            className="kraftflix-title"
            href="#"
            onClick={handleBrandClick}
          >
            <h1>kraftFlix</h1>
          </Navbar.Brand>
          {user && (
            <Nav className="ml-auto">
              <Button
                className="ciao-button"
                variant="outline-cia"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Nav>
          )}
        </Container>
      </Navbar>

      <Container className="flex-grow-1">
        <Row className="justify-content-md-center">
          {!user ? (
            <Col md={6}>
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
              or
              <SignupView />
            </Col>
          ) : error ? (
            <Col>
              <div>Error: {error}</div>
            </Col>
          ) : selectedMovie ? (
            <Col md={8}>
              <MovieView
                style={{ border: '1px solid green' }}
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
                onLogoutClick={handleLogout}
              />
            </Col>
          ) : movies.length === 0 ? (
            <Col>
              <div>The list is empty!</div>
            </Col>
          ) : (
            <>
              {movies.map((movie) => (
                <Col
                  className="mb-5"
                  key={movie.ID}
                  sm={6} //  ≥576px
                  md={4} //  ≥768px
                  lg={3} //  ≥992px
                >
                  <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                    onLogoutClick={handleLogout}
                  />
                </Col>
              ))}
            </>
          )}
        </Row>
      </Container>

      <Navbar bg="black" variant="dark" className="mt-3 mb-1">
        <Container className="justify-content-center">
          <Navbar.Text className="kraftflix-footer">
            &copy; 2024 kraftFlix
          </Navbar.Text>
        </Container>
      </Navbar>
    </Container>
  );
};

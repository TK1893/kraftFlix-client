import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/singnup-view';
import '../..//index.scss';

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

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (error) {
    return (
      <>
        <button className="scroll-button" onClick={handleLogout}>
          Logout
        </button>
        <div>Error: {error}</div>
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
          onLogoutClick={handleLogout}
        />
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <button className="scroll-button" onClick={handleLogout}>
          Logout
        </button>
        <div>The list is empty!</div>
      </>
    );
  }

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          key={movie.ID}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button className="scroll-button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

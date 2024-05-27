import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/singnup-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  // **** Anleitung Neu ********************************
  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   }
  //   fetch('https://kraftflix-api-d019e99d109c.herokuapp.com/movies', {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, [token]);

  // **** Neu Master ********************************
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
        const moviesFromApi = data.map((movie) => {
          return {
            Imageurl: movie.Imageurl,
            ID: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Featured: movie.Featured,
            Director: movie.Director,
            Genre: movie.Genre,
            Actors: movie.Actors,
            Year: movie.Year,
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setError(error.message);
      });
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

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

  if (selectedMovie) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        ;
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        ;<div>The list is empty!</div>;
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
      ;
      {movies.map((movie) => (
        <MovieCard
          key={movie.ID}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </>
  );
};

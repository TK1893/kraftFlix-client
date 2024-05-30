import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import '../..//index.scss'; // Importiere deine CSS-Datei

export const MovieView = ({ movie, onBackClick, onLogoutClick }) => {
  return (
    <div>
      <div>
        <img className="w-100" src={movie.Imageurl} />
      </div>
      <span>
        <h2>{movie.Title}</h2>
        <p className="pYear">( {movie.Year} )</p>
      </span>
      <span>
        <h3>Plot</h3>
        <p className="pPlot">{movie.Description}</p>
      </span>
      <span>
        <h3>Director</h3>
        <p>{movie.Director.Name}</p>
        <h4>Biography</h4>
        <p className="pBio">{movie.Director.Bio}</p>
      </span>
      <span>
        <h3>Genre</h3>
        <p>{movie.Genre.Name}</p>
      </span>
      <span>
        <h3>Actors</h3>
        <p>{movie.Actors.join(', ')}</p>
      </span>
      <span>
        <h3>Featured</h3>
        <p>{movie.Featured ? 'Yes' : 'No'}</p>
      </span>
      <Button variant="primary" onClick={onBackClick}>
        Back
      </Button>
      <Button variant="primary" onClick={onLogoutClick}>
        Logout
      </Button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    ID: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Imageurl: PropTypes.string,
    Featured: PropTypes.bool,
    Year: PropTypes.string,
    Actors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
};

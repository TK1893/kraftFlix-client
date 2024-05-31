import React from 'react';
import PropTypes from 'prop-types';
import '../..//index.scss'; // Importiere deine CSS-Datei

export const MovieView = ({ movie, onBackClick, onLogoutClick }) => {
  return (
    <div className="movie-view-container">
      <div>
        <span>
          <img src={movie.Imageurl} />
        </span>
      </div>
      <div>
        <span>
          <h2>{movie.Title}</h2>
          <p className="pYear">( {movie.Year} )</p>
        </span>
      </div>
      <div>
        <span>
          <h3>Plot</h3>
        </span>
        <span>
          <p className="pPlot">{movie.Description}</p>
        </span>
      </div>
      <div>
        <span>
          <h3>Director</h3>
        </span>
        <span>
          <p>{movie.Director.Name}</p>
          <h4>Biography</h4>
          <p className="pBio">{movie.Director.Bio}</p>
        </span>
      </div>
      <div>
        <span>
          <h3>Genre</h3>
        </span>
        <span>
          <p>{movie.Genre.Name}</p>
        </span>
      </div>
      <div>
        <span>
          <h3>Actors</h3>
        </span>
        <span>
          <p>{movie.Actors.join(', ')}</p>
        </span>
      </div>
      <div>
        <span>
          <h3>Featured</h3>
        </span>
        <span>
          <p>{movie.Featured ? 'Yes' : 'No'}</p>
        </span>
      </div>
      <div className="button-container">
        <button className="scroll-button" onClick={onBackClick}>
          Back
        </button>
        <button className="scroll-button" onClick={onLogoutClick}>
          Logout
        </button>
      </div>
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

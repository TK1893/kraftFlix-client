import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import '../../index.scss';

export const MovieCard = ({ movie, addToFavorites }) => {
  const handleAddToFavorites = () => {
    addToFavorites(movie._id); // Übergeben Sie die _id des Films an die addToFavorites Funktion
  };

  return (
    <Card className="karteS h-100">
      <Link to={`/movies/${encodeURIComponent(movie.ID)}`}>
        <Card.Img variant="top" src={movie.Imageurl} />
      </Link>
      <Card.Body>
        <Card.Title className="karteS-title">{movie.Title}</Card.Title>
        <Card.Text className="karteS-text">{movie.Director.Name}</Card.Text>
        {/* <Link to={`/movies/${encodeURIComponent(movie.ID)}`}>
          <Button className="custom-button" variant="link">
            Details
          </Button>
        </Link> */}
        <Button
          size="sm"
          className="heart-button"
          variant="outline-custom"
          onClick={handleAddToFavorites}
        >
          Add to <FaHeart />
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Die _id des Films als erforderliches Prop
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
  addToFavorites: PropTypes.func.isRequired, // Funktion zum Hinzufügen zu Favoriten als erforderliches Prop
};

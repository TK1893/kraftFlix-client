import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import '../../index.scss';

export const MovieView = ({ movies, addToFavorites }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.ID === movieId);

  const handleAddToFavorites = () => {
    addToFavorites(movie._id);
  };

  return (
    <>
      <Card>
        <Card.Img
          className="w-70 d-flex justify-content-center align-items-center"
          variant="top"
          src={movie.Imageurl}
        />
        <Card.Body>
          <div className="karteL-wrapper">
            <Card.Title className="karteL-film">{movie.Title}</Card.Title>
            <Card.Text className="karteL-jahr">( {movie.Year} )</Card.Text>
          </div>
          <Card.Title className="karteL-title">Plot</Card.Title>
          <Card.Text className="karteL-text">{movie.Description}</Card.Text>
          <Card.Title className="karteL-title">Director</Card.Title>
          <Card.Text className="karteL-text">{movie.Director.Name}</Card.Text>
          <Card.Text>
            <h6>Biography</h6>
          </Card.Text>
          <Card.Text className="karteL-text">{movie.Director.Bio}</Card.Text>
          <Card.Title className="karteL-title">Genre</Card.Title>
          <Card.Text className="karteL-text">{movie.Genre.Name}</Card.Text>
          <Card.Title className="karteL-title">Actors</Card.Title>
          <Card.Text className="karteL-text">
            {movie.Actors.join(', ')}
          </Card.Text>
          <Card.Title className="karteL-title">Featured</Card.Title>
          <Card.Text className="karteL-text">
            {movie.Featured ? 'Yes' : 'No'}
          </Card.Text>
          <Button
            variant="outline"
            size="lg"
            className="heart-button me-3 my-3"
            onClick={handleAddToFavorites}
          >
            Add to <FaHeart />
          </Button>
        </Card.Body>
      </Card>
      <Link to={`/`}>
        <Button
          variant="outline-custom"
          className="custom-button me-3 my-3"
          size="md"
        >
          Back
        </Button>
      </Link>{' '}
    </>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
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
    })
  ).isRequired,
  addToFavorites: PropTypes.func.isRequired,
};

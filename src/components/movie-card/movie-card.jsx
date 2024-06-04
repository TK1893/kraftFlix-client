import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../index.scss';

export const MovieCard = ({ movie }) => {
  return (
    <Card className="karteS h-100">
      <Card.Img variant="top" src={movie.Imageurl} />
      <Card.Body>
        <Card.Title className="karteS-title">{movie.Title}</Card.Title>
        <Card.Text className="karteS-text">{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.ID)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ID: PropTypes.string.isRequired,
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
};

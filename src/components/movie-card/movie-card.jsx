import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import '../../index.scss';
// import './movie-card.scss';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="karteS h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.Imageurl} />
      <Card.Body>
        <Card.Title className="karteS-title">{movie.Title}</Card.Title>
        <Card.Text className="karteS-text">{movie.Director.Name}</Card.Text>
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
  onMovieClick: PropTypes.func.isRequired,
};

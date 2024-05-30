import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import '../..//index.scss';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.Imageurl} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        {/* <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button> */}
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

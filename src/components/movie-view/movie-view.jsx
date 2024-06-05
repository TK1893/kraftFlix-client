import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import '../../index.scss';

// TOBI Variante ex-3.7
export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.ID === movieId);
  return (
    <Card>
      <Card.Img className="w-80" variant="top" src={movie.Imageurl} />
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
        <Card.Text className="karteL-text">{movie.Actors.join(', ')}</Card.Text>
        <Card.Title className="karteL-title">Featured</Card.Title>
        <Card.Text className="karteL-text">
          {movie.Featured ? 'Yes' : 'No'}
        </Card.Text>
        <Link to={`/`}>
          <Button
            variant="outline-custom"
            className="custom-button me-3 my-3"
            size="md"
          >
            Back
          </Button>{' '}
        </Link>
      </Card.Body>
    </Card>
  );
};

// CF Variante ex-3.7
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

// export const MovieView = ({ movies }) => {
//   const { movieId } = useParams();

//   const movie = movies.find((m) => m.ID === movieId);

//   return (
//     <div>
//       <div>
//         <img className="w-100" src={movie.Imageurl} />
//       </div>
//       <div>
//         <span>Title: </span>
//         <span>{movie.Title}</span>
//       </div>
//       <div>
//         <span>Director: </span>
//         <span>{movie.Director.Name}</span>
//       </div>
//       <Link to={`/`}>
//         <button className="back-button">Back</button>
//       </Link>
//     </div>
//   );
// };

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
};

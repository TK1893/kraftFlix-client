import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      Genre: {
        Name: 'Crime',
        Description:
          'Movies that focus on criminal activities and underworld characters.',
      },
      Director: {
        Name: 'Francis Ford Coppola',
        Bio: 'Francis Ford Coppola is an American film director, producer, and screenwriter.',
      },
      Actors: [],
      _id: '6629095e6e3b378ee9117b8b',
      Title: 'The Godfather',
      Description: `The Godfather "Don" Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter's wedding. Michael, Vito's youngest son and a decorated WWII Marine is also present at the wedding. Michael seems to be uninterested in being a part of the family business. Vito is a powerful man, and is kind to all those who give him respect but is ruthless against those who do not. But when a powerful and treacherous rival wants to sell drugs and needs the Don's influence for the same, Vito refuses to do it. What follows is a clash between Vito's fading old values and the new ways which may cause Michael to do the thing he was most reluctant in doing and wage a mob war against all the other mafia families which could tear the Corleone family apart.`,
      Imageurl:
        'https://seeklogo.com/images/G/Godfather-logo-A0B21194F0-seeklogo.com.png',
      Featured: true,
    },
    {
      Genre: {
        Name: 'Crime',
        Description:
          'Movies that focus on criminal activities and underworld characters.',
      },
      Director: {
        Name: 'Quentin Tarantino',
        Bio: 'Quentin Tarantino is an American film director, screenwriter, and producer.',
      },
      Actors: [],
      _id: '6629095e6e3b378ee9117b8d',
      Title: 'Pulp Fiction',
      Description:
        'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      Imageurl:
        'https://images.unsplash.com/photo-1612668401767-a2196c1c6670?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Featured: true,
    },
    {
      Genre: {
        Name: 'Science Fiction',
        Description: 'Movies that explore speculative or futuristic concepts.',
      },
      Director: {
        Name: 'Christopher Nolan',
        Bio: 'Christopher Nolan is a British-American film director, producer, and screenwriter.',
      },
      Actors: ['Leonardo DiCaprio ,', ' Joseph Gordon-Levitt'],
      _id: '6629095e6e3b378ee9117b85',
      Title: 'Inception',
      Description: `Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved. Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible, inception. Instead of the perfect heist, Cobb and his team of specialists have to pull off the reverse: their task is not to steal an idea, but to plant one. If they succeed, it could be the perfect crime. But no amount of careful planning or expertise can prepare the team for the dangerous enemy that seems to predict their every move. An enemy that only Cobb could have seen coming.`,
      Imageurl:
        'https://images.squarespace-cdn.com/content/v1/5ec686197f8b2976074846c2/1618809593080-N5PB8CWYOW3OPDE2TT6E/Feature+3-1.png?format=1500w',
      Featured: true,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

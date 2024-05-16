export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.Imageurl} />
      </div>
      <div>
        <span>
          <h3>Title</h3>
        </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>
          <h3>Description</h3>
        </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>
          <h3>Director</h3>
        </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>
          <h3>Genre</h3>
        </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

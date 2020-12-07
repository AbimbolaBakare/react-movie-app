import React from "react";
import { Link } from "react-router-dom";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

    const id = movie.imdbID
  return (
    <Link className='movie' to={`/movies/${id}`}>
      <article>
        <img src={poster} alt={movie.Title} />
        <div className='movie-info'>
          <h4 className='title'>{movie.Title}</h4>
          <p>{movie.Year}</p>
        </div>
      </article>
    </Link>

  );
};

export default Movie;
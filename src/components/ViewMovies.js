import React, { useReducer, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { initialState, reducer } from "../store/reducer";
import axios from 'axios';

const DEFAULT_PLACEHOLDER_IMAGE =
    "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


const SingleMovie = () => {
    const { id } = useParams();

    const [state, dispatch] = useReducer(reducer, initialState);

    const SINGLE_MOVIE_URL = `https://www.omdbapi.com/?apikey=6a451f2c&i=${id}`;

    function getMovie() {
        axios.get(SINGLE_MOVIE_URL).then(res => {
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: res.data
            });
        });
    }

    useEffect(() => {
        getMovie();
    }, []);

    const { movies, errorMessage, loading } = state;

    const poster =
        movies.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movies.Poster;

    const retrievedMovies =
        loading && !errorMessage ? (
            <div className='loading'></div>
        ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}
                <Link to='/' className='submit'>
                    Back to movies
        </Link>
            </div>
        ) : (
                    <div className='single-movie'>
                        <img src={poster} alt={movies.Title} />
                        <div className='single-movie-info'>
                            <h2>{movies.Title}</h2>
                            <p>{movies.Plot}</p>
                            <h4>{movies.Year}</h4>
                            <h5>Cast: {movies.Actors}</h5>
                            <Link to='/' className='submit'>
                                back to movies
        </Link>
                        </div >

                    </div>
                );
    return (
        <section >
            {retrievedMovies}
        </section>
    )
}

export default SingleMovie

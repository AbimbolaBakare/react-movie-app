import React, { useReducer, useEffect, useState, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";
import { initialState, reducer } from "./store/reducer";
import axios from "axios";
import { gsap } from "gsap";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=jumanji&apikey=6a451f2c";

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [background, setBackground] = useState('#102a42');
  const headerRef = useRef(null);

  const toggleBackground = () => {
    const color = background !== '#102a42' ? '#102a42' : 'purple';
    setBackground(color);
  }

  useEffect(() => {
    gsap.to(headerRef.current, { backgroundColor: background, duration: 1, ease: 'none' });
  }, [background]);


  useEffect(() => {
    axios.get(MOVIE_API_URL).then(res => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: res.data.Search
      });
    });
  }, []);


  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=6a451f2c`).then(
      res => {
        if (res.data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: res.data.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: res.data.Error
          });
        }
      }
    );
  };

  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
      <div className='loading'></div>
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

  return (
    <div className="App" ref={headerRef}>
        <Header text="MOVIE APP" />
        <button onClick={() => toggleBackground()} >Change background color</button>
        <Search search={search} />

        <p className="App-intro">Yout favorite movies all in one place</p>

        <div className='movies'>{retrievedMovies}</div>
      </div>
  );
};

export default Home;
import { Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage'
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import Navigation from './components/Navigation/Navigation';

import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';
import './App.css';

import fetchMovies from "./utils/movies-api";
function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [moviesSearchList,setmoviesSearchList]=useState([])

  const [queryData, setQueryData] = useState({});
  const [casts, setCasts] = useState([]);
  const [reviwes, setReviewes] = useState([]);

  function getSearchResult(name) {
    const queryParams = {
      path: `search/movie?query=${name}`,
      dataKey: "results",
      setData: setmoviesSearchList,
    };
    setQueryData({ ...queryParams });
  } 



  function getMovieList() {
    const queryParams = {
      path: "trending/movie/day",
      dataKey: "results",
      setData: setMoviesList,
    };
    setQueryData({ ...queryParams });
  }

  function getCastData(params) {
    const queryParams = {
      setData: setCasts,
    };
    setQueryData({ ...params, ...queryParams });
  }

  function getGenreList() {
    const queryParams = {
      path: "genre/movie/list",
      dataKey: "genres",
      setData: setGenres,
    };
    setQueryData({ ...queryParams });
  }

  function getReviewsData(params) {
    const queryParams = {
      setData: setReviewes,
    };
    setQueryData({ ...params, ...queryParams });
  }

  useEffect(() => {
    const getData = async ({ path, dataKey, setData }) => {
      try {
        setError(false);
        setLoading(true);

        if (path) {
          const data = await fetchMovies(path);
         

          setData(() => {
            return [...data[dataKey]];
          });
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getData(queryData);
  }, [queryData]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isLoading={loading}
              trendingMovies={moviesList}
              getMovies={getMovieList}
            />
          }
        />
        <Route path="/movies" element={<MoviesPage makeSearch={getSearchResult} searcResult={moviesSearchList} />} />
        
        <Route
          path="/movies/:id"
          element={
            <MovieDetailsPage 
            trendMovies={moviesList}
              searchedMovies={moviesSearchList}
              getGenres={getGenreList}
              genresData={genres}
            />
          }
        >
          <Route
            path="casts"
            element={<MovieCast getCasts={getCastData} castsData={casts} />}
          />
          <Route
            path="reviews"
            element={
              <MovieReviews getReviews={getReviewsData} reviwesData={reviwes}  />
            }
          />
        </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;

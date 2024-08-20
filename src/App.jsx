import { Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import HomePage from "./pages/HomePage/HomePage";
import Navigation from "./components/Navigation/Navigation";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import "./App.css";

import fetchMovies from "./utils/movies-api";
function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [genres, setGenres] = useState([]);

  const [queryData, setQueryData] = useState({});
  const [casts, setCasts] = useState([]);
  const [reviwes, setReviewes] = useState([]);
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
        <Route path="/movies" element={<MoviesPage />} />
        
        <Route
          path="/movies/:id"
          element={
            <MovieDetailsPage
              movies={moviesList}
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

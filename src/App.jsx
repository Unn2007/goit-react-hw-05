import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Navigation from "./components/Navigation/Navigation";

import "./App.css";
import fetchMovies from "./utils/movies-api";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [moviesSearchList, setmoviesSearchList] = useState([]);
  const [movieById, setmovieById] = useState();
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

  function getMovieById(movieId) {
    const queryParams = {
      path: `movie/${movieId}`,
      dataKey: "",
      setData: setmovieById,
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

          if (dataKey) {
            setData(() => {
              return [...data[dataKey]];
            });
          } else {
            setData(() => {
              return { ...data };
            });
          }
        }
      } catch (error) {
        setError(true);
        toast.error("Error.Try again.", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };

    getData(queryData);
  }, [queryData]);

  return (
    <>
      <Navigation />
      {error && <Toaster />}
      <Suspense fallback={<div>Loading page...</div>}>
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
          <Route
            path="/movies"
            element={
              <MoviesPage
                makeSearch={getSearchResult}
                searcResult={moviesSearchList}
                isLoading={loading}
              />
            }
          />

          <Route
            path="/movies/:id"
            element={
              <MovieDetailsPage
                movieIdData={movieById}
                getmovieIdData={getMovieById}
                isLoading={loading}
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
                <MovieReviews
                  getReviews={getReviewsData}
                  reviwesData={reviwes}
                />
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

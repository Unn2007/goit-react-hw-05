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
  const [searchPath, setSearchPath] = useState("");
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getGenreList = async () => {
      // if (searchPath==="genre/movie/list") {
      try {
        setError(false);
        setLoading(true);
        const genresList = await fetchMovies("genre/movie/list");
        setGenres(() => {
          return [...genresList.genres];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    // }

    getGenreList();
  }, []);

  useEffect(() => {
    const getData = async (query) => {
      try {
        setError(false);
        setLoading(true);

        if (searchPath === "trending/movie/day") {
          const data = await fetchMovies(query);

          if (data.results.length === 0) {
            toast.error(`Error.Nothing find`, { position: "top-left" });
          }

          setMoviesList(() => {
            return [...data.results];
          });
        }

        if (searchPath.slice(0, 5) === "movie") {
          const data = await fetchMovies(query);

          if (data.results.length === 0) {
            toast.error(`Error.Nothing find`, { position: "top-left" });
          }

          setCasts(() => {
            return [...data.results];
          });
          console.log(casts)
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getData(searchPath);
  }, [searchPath]);

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
              getMovies={setSearchPath}
            />
          }
        />
        {/* <Route path="'/movies'" element={<Movies />} />
        <Route path="/products" element={<Products />} /> */}
        {/* <Route
          path="/movies/:id"
          element={<MovieDetailsPage movies={moviesList} genresData={genres} />}
        /> */}
        <Route
          path="/movies/:id"
          element={<MovieDetailsPage movies={moviesList} genresData={genres} />}
        >
          <Route
            path="casts"
            element={<MovieCast getCasts={setSearchPath} />}
          />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;

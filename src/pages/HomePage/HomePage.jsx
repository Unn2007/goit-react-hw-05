import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";
import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import getData from "../../utils/getData";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    function getMovieList() {
      const queryParams = {
        path: "trending/movie/day",
        dataKey: "results",
        setData: setMoviesList,
        setError: setError,
        setLoading: setLoading,
      };
      getData({ ...queryParams });
    }

    getMovieList();
  }, []);

  return (
    <main>
      <section className={css.homePage}>
        <h1 className={css.homeHeader}>Trending today</h1>
        {error && <Toaster />}
        {loading && (
          <InfinitySpin
            visible={true}
            width="100"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        )}

        <MovieList movies={moviesList} />
      </section>
    </main>
  );
}

export default HomePage;

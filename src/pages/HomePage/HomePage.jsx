import { InfinitySpin } from "react-loader-spinner";

import css from "./HomePage.module.css";

import MovieList from "../../components/MovieList/MovieList";
import { useEffect } from "react";

function HomePage({ isLoading, trendingMovies, getMovies }) {
  
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      {isLoading && (
        <InfinitySpin
          visible={true}
          width="100"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      )}

      <MovieList movies={trendingMovies} />
    </main>
  );
}

export default HomePage;

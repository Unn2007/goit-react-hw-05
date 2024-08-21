import { InfinitySpin } from "react-loader-spinner";

import css from "./HomePage.module.css";

import MovieList from "../../components/MovieList/MovieList";
import { useEffect,useState } from "react";

function HomePage({ isLoading, trendingMovies, getMovies}) {
 
  useEffect(() => {
    getMovies();
   
   
  }, []);
 
  

  return (
    <main>
      <section className={css.homePage}>
      <h1 className={css.homeHeader}>Trending today</h1>
      {isLoading && (
        <InfinitySpin
          visible={true}
          width="100"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      )}

      <MovieList movies={trendingMovies} />
      </section>
    </main>
  );
}

export default HomePage;

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import css from "./MoviesPage.module.css";
import SearchBox from "../../components/SearchBox/SearchBox";
import MovieList from "../../components/MovieList/MovieList";

function MoviesPage({ searcResult, makeSearch, isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = searchParams.get("query") ?? "";

  const updateQueryString = (value) => {
    const nextParams = value !== "" ? { query: value } : {};
    setSearchParams(nextParams);
  };
  useEffect(() => {
    if (queryString !== "") {
      makeSearch(queryString);
    }
  }, [searchParams]);

  return (
    <main>
      {isLoading && (
        <InfinitySpin
          visible={true}
          width="100"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      )}
      <div className={css.moviesPage}>
        <SearchBox onSearch={makeSearch} setQueryParams={updateQueryString} />
        <MovieList movies={searcResult} />
      </div>
    </main>
  );
}

export default MoviesPage;

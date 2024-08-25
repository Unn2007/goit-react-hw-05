import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";
import css from "./MoviesPage.module.css";
import SearchBox from "../../components/SearchBox/SearchBox";
import MovieList from "../../components/MovieList/MovieList";

import getData from "../../utils/getData";
function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [moviesSearchList, setmoviesSearchList] = useState([]);
  const queryString = searchParams.get("query") ?? "";
  const updateQueryString = (value) => {
    const nextParams = value !== "" ? { query: value } : {};
    setSearchParams(nextParams);
  };

  useEffect(() => {
    function getSearchResult(name) {
      if (name == "") {
        return;
      }
      const queryParams = {
        path: `search/movie?query=${name}`,
        dataKey: "results",
        setData: setmoviesSearchList,
        setError: setError,
        setLoading: setLoading,
      };
      getData({ ...queryParams });
    }

    getSearchResult(queryString);
  }, [searchParams]);

  return (
    <main>
      {error && <Toaster />}
      {loading && (
        <InfinitySpin
          visible={true}
          width="100"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      )}
      <div className={css.moviesPage}>
        <SearchBox setQueryParams={updateQueryString} />
        <MovieList movies={moviesSearchList} />
      </div>
    </main>
  );
}

export default MoviesPage;

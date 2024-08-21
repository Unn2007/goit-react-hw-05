import { useSearchParams } from "react-router-dom";
import { useEffect,useState } from "react";
import css from './MoviesPage.module.css'
import SearchBox from '../../components/SearchBox/SearchBox';
import MovieList from "../../components/MovieList/MovieList";
function MoviesPage({searcResult,makeSearch}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryString = searchParams.get("query") ?? "";
   
    const updateQueryString = (value) => {
        const nextParams = value !== "" ? { query:value } : {};
        setSearchParams(nextParams);
       
      };
      useEffect(()=>{
        if(queryString!=="") {makeSearch(queryString)}

      },[searchParams])



    
    return (
        <main>
          <div className={css.moviesPage}>
            <SearchBox onSearch={makeSearch} setQueryParams={updateQueryString}/>
            <MovieList movies={searcResult}/>
            </div>

        </main>
    )
}

export default MoviesPage;
import { useSearchParams } from "react-router-dom";
import { useEffect,useState } from "react";
import SearchBox from '../../components/SearchBox/SearchBox';
import MovieList from "../../components/MovieList/MovieList";
function MoviesPage({searcResult,makeSearch}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryString = searchParams.get("query") ?? "";
   
    const updateQueryString = (query) => {
        const nextParams = query !== "" ? { query } : {};
        setSearchParams(nextParams);
       
      };
      useEffect(()=>{
        if(queryString!=="") {makeSearch(queryString)}

      },[searchParams])



    
    return (
        <main>
            <SearchBox onSearch={makeSearch} setQueryParams={updateQueryString}/>
            <MovieList movies={searcResult}/>
           

        </main>
    )
}

export default MoviesPage;
import { Routes, Route, NavLink } from 'react-router-dom';
import { useState,useEffect } from 'react'

import HomePage  from "./pages/HomePage/HomePage";
import Navigation from "./components/Navigation/Navigation";
import  MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage'

import './App.css'

import fetchMovies from './utils/movies-api'
function App() {


  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [moviesList,setMoviesList]=useState([]);
    const [genres,setGenres] = useState([])
    const path="trending/movie/day";
    useEffect(() => {
        const getMovies = async (query) => {
          try {
           
              setError(false);
              setLoading(true);
              const genresList = await fetchMovies("genre/movie/list");
              setGenres(() => {
                return [...genresList.genres];
              });
              const data = await fetchMovies(query);
              // console.log(genresList.genres)
              if (data.results.length === 0) {
                toast.error(`Error.Nothing find`, { position: "top-left" });
              }
             
            
              setMoviesList(() => {
                return [...data.results];
              });
          
          } catch (error) {
            setError(true);
          } finally {
            setLoading(false);
          }
        };
    
        getMovies(path);
      }, []);
 
  
  return (
    <>
       <Navigation/>
      <Routes>
        <Route path="/" element={<HomePage isLoading={loading} trendingMovies={moviesList}/>} />
        {/* <Route path="'/movies'" element={<Movies />} />
        <Route path="/products" element={<Products />} /> */}
         <Route path="/movies/:id" element={<MovieDetailsPage movies={moviesList} genresData={genres} />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  )
}

export default App

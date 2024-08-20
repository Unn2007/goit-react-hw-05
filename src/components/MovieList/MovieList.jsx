import { Link,useLocation } from 'react-router-dom';
import css from './MovieList.module.css';







function MovieList({movies}) {
  const location = useLocation();
    return (

        <div className={css.container}>
      {movies.map((movie) => (
        <div key={movie.id} className={css.cardWrapper}>
          <Link to={`/movies/${movie.id}`}  state={location} >
            
            <h3>{movie.title}</h3>
          </Link>
        </div>
      ))}
    </div>

       



    );
}

export default MovieList;
import { Link } from 'react-router-dom';
import css from './MovieList.module.css';







function MovieList({movies}) {
    
    return (

        <div className={css.container}>
      {movies.map((movie) => (
        <div key={movie.id} className={css.cardWrapper}>
          <Link to={`/movies/${movie.id}`} >
            
            <h3>{movie.title}</h3>
          </Link>
        </div>
      ))}
    </div>

       



    );
}

export default MovieList;
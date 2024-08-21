import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import formatCreateDate from "../../utils/formatDate";
import genresNames from "../../utils/genresNames";
import BackLink from "../../components/BackLink/BackLink";
import css from './MovieDetailsPage.module.css'

function MovieDetailsPage({
  trendMovies,
  searchedMovies,
  genresData,
  getGenres,
}) {
  const { id } = useParams();
  const location = useLocation();

  const backLinkHref = location.state ?? "/";
  const pathToImage = "https://image.tmdb.org/t/p/w500/";
  const listToRender = [...trendMovies, ...searchedMovies];

  const selectedMovie = listToRender.find((movie) => +movie.id === +id);
  const {
    poster_path,
    title,
    release_date,
    vote_average,
    overview,
    genre_ids,
  } = selectedMovie;
  useEffect(() => {
    getGenres();
  }, []);

  return (
    <main>
      <div>
      <BackLink to={backLinkHref}>Go back</BackLink>
      <div className={css.movieDetalies}>

      <div className={css.thumb}>
        <img className={css.posterImage} src={`${pathToImage}${poster_path}`} />
      </div>
      <div className={css.movieInfo}>
        <h2>{`${title} (${formatCreateDate(release_date)})`}</h2>
        <p>{`User Score: ${Math.round(vote_average * 10)}%`}</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3>Genres</h3>
        <p>{`${genresNames(genresData, genre_ids)}`}</p>
      </div>
      </div>

      <div className={css.additInfo}>

      <h3>Additional information</h3>

      <ul>
        <li>
          <Link to="casts" state={location} className={css.additInfoLink}>
            Casts
          </Link>
        </li>
        <li>
          <Link to="reviews" state={location} className={css.additInfoLink}>
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
      </div>
      </div>
    </main>
  );
}

export default MovieDetailsPage;

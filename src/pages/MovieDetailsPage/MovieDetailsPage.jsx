import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import formatCreateDate from "../../utils/formatDate";
import genresNames from "../../utils/genresNames";
import BackLink from "../../components/BackLink/BackLink";
import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage({ movieIdData, getmovieIdData }) {
  const { id } = useParams();
  const location = useLocation();

  const backLinkHref = location.state ?? "/";
  const pathToImage = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    if (!id) {
      return;
    }
    getmovieIdData(id);
  }, [id]);

  console.log(movieIdData);

  // const {
  //   poster_path,
  //   title,
  //   release_date,
  //   vote_average,
  //   overview,
  //   genres,
  // } = movieIdData;

  return (
    <main>
      <div>
        

        <BackLink to={backLinkHref}  >Go back</BackLink>
        
        <div className={css.movieDetalies}>
          <div className={css.thumb}>
            <img
              className={css.posterImage}
              src={`${pathToImage}${movieIdData?.poster_path}`}
            />
          </div>
          <div className={css.movieInfo}>
            <h2>{`${movieIdData?.title} (${formatCreateDate(movieIdData?.release_date)})`}</h2>
            <p>{`User Score: ${Math.round(movieIdData?.vote_average * 10)}%`}</p>
            <h3>Overview</h3>
            <p>{movieIdData?.overview}</p>
            <h3>Genres</h3>
            <p>{`${genresNames(movieIdData?.genres)}`}</p>
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

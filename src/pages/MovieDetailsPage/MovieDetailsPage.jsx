import { useParams, useLocation, Outlet, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Suspense } from "react";
import { InfinitySpin } from "react-loader-spinner";
import formatCreateDate from "../../utils/formatDate";
import genresNames from "../../utils/genresNames";
import BackLink from "../../components/BackLink/BackLink";
import css from "./MovieDetailsPage.module.css";
import imagePlaceholder from "../../assets/hole.jpg";

function MovieDetailsPage({ movieIdData, getmovieIdData, isLoading }) {
  const { id } = useParams();
  const location = useLocation();

  const backLinkHref = useRef(location.state ?? "/");
  const pathToImage = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    if (!id) {
      return;
    }
    getmovieIdData(id);
  }, [id]);

  const imagePath = movieIdData?.poster_path
    ? `${pathToImage}${movieIdData?.poster_path}`
    : imagePlaceholder;

  return (
    <main>
      <div>
        <BackLink to={backLinkHref.current}>Go back</BackLink>
        {isLoading && (
          <InfinitySpin
            visible={true}
            width="100"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        )}
        <div className={css.movieDetalies}>
          <div className={css.thumb}>
            <img className={css.posterImage} src={imagePath} />
          </div>
          <div className={css.movieInfo}>
            <h2>{`${movieIdData?.title} (${formatCreateDate(
              movieIdData?.release_date
            )})`}</h2>
            <p>{`User Score: ${Math.round(
              movieIdData?.vote_average * 10
            )}%`}</p>
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
              <Link to="casts" className={css.additInfoLink}>
                Casts
              </Link>
            </li>
            <li>
              <Link to="reviews" className={css.additInfoLink}>
                Reviews
              </Link>
            </li>
          </ul>
          <Suspense fallback={<div>Loading subpage...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export default MovieDetailsPage;

import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import formatCreateDate from "../../utils/formatDate";
import genresNames from "../../utils/genresNames";
import  BackLink  from "../../components/BackLink/BackLink";

function MovieDetailsPage({ movies,searchedMovies, genresData, getGenres }) {
  const { id } = useParams();
  const location = useLocation();
   
  const backLinkHref = location.state ?? "/";
  const pathToImage = "https://image.tmdb.org/t/p/w500/";
  const listToRender= [...movies,...searchedMovies]

  const selectedMovie = listToRender.find((movie) => +movie.id === +id);
  const {poster_path,title,release_date,vote_average,overview,genre_ids}=selectedMovie
  useEffect(() => {
    getGenres();
   
  }, []);

  return (
    <main>
       <BackLink to={backLinkHref}>Go back</BackLink>
      
      <div>
        <img src={`${pathToImage}${poster_path}`} />
      </div>
      <div>
        <h2>{`${title}(${formatCreateDate(release_date)})`}</h2>
        <p>{`User Score: ${Math.round(vote_average * 10)}%`}</p>
        <p>Overview</p>
        <p>{overview}</p>
        <p>Genres</p>
        <p>{`${genresNames(genresData, genre_ids)}`}</p>
      </div>

      <ul>
        <li>
          <Link to="casts" state={location}>Casts</Link>
        </li>
        <li>
          <Link to="reviews" state={location}>Reviews</Link>
        </li>
       
      </ul>
      <Outlet />
    </main>
  );
}

export default MovieDetailsPage;

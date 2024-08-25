import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import imagePlaceholder from "../../assets/image.jpg";
import css from "./MovieCast.module.css";
import getData from "../../utils/getData";

function MovieCast() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [casts, setCasts] = useState([]);

  const { id } = useParams();
  const isCasts = casts.length === 0;
  useEffect(() => {
    function getCastData(movieId) {
      if (!movieId) {
        return;
      }

      const queryParams = {
        path: `movie/${movieId}/credits`,
        dataKey: "cast",
        setData: setCasts,
        setError: setError,
        setLoading: setLoading,
      };
      getData({ ...queryParams });
    }
    getCastData(id);
  }, [id]);

  return (
    <div>
      {error && <Toaster />}
      {loading && (
        <InfinitySpin
          visible={true}
          width="100"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      )}
      {isCasts && <p>"We do not have any casts info for this movie"</p>}

      <ul>
        {casts.map(({ character, name, profile_path, id }) => {
          const imagePath = profile_path
            ? `https://image.tmdb.org/t/p/w500/${profile_path}`
            : imagePlaceholder;
          return (
            <li key={id}>
              <div className={css.thumb}>
                <img src={imagePath} className={css.actorFoto} />
              </div>

              <p>{name}</p>
              <p>{`Character: ${character}`}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MovieCast;

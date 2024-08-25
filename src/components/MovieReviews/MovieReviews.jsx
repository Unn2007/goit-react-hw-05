import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import getData from "../../utils/getData";

function MovieReviews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviwes, setReviewes] = useState([]);
  const { id } = useParams();
  let isReviews;

  useEffect(() => {
    function getReviewsData(movieId) {
      if (!movieId) {
        return;
      }
      const queryParams = {
        path: `movie/${movieId}/reviews`,
        dataKey: "results",
        setData: setReviewes,
        setError: setError,
        setLoading: setLoading,
      };
      getData({ ...queryParams });
    }

    getReviewsData(id);
  }, [id]);

  isReviews = Boolean(reviwes.length);

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
      {!isReviews && <p>We do not have any reviews for this movie</p>}
      {isReviews && (
        <ul>
          {reviwes.map(({ author, content, id }) => {
            return (
              <li key={id}>
                <h3>{`Author: ${author}`}</h3>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MovieReviews;

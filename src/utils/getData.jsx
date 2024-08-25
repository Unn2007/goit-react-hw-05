import fetchMovies from "./movies-api";
import toast from "react-hot-toast";

const getData = async ({ path, dataKey, setData, setError, setLoading }) => {
  try {
    setError(false);
    setLoading(true);
    if (path) {
      const data = await fetchMovies(path);

      if (dataKey) {
        setData(() => {
          return [...data[dataKey]];
        });
      } else {
        setData(() => {
          return { ...data };
        });
      }
    }
  } catch (error) {
    setError(true);
    toast.error("Error.Try again.", {
      position: "top-right",
    });
  } finally {
    setLoading(false);
  }
};

export default getData;

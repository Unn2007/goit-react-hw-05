import axios from "axios";




axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const accessKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDhlOTU4N2MzYTZhOWZiYTE2NjgxZTM0NDAxMzc2ZCIsIm5iZiI6MTcyMzkwNDQyMi45MDcxNzEsInN1YiI6IjY2YzBhZTU1OWRiZGZhOWQyMWRlYjQyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RyJ--03A27MeG1Of7RK8fgJ8J0RgPyfkGJWangr-8oM";

const itemsPerPage = 15;

const fetchMovies = async (path="trending/movie/day", pageNumber = 1) => {
  const response = await axios.get(`${path}`, {
    headers: {
      Authorization: `Bearer ${accessKey}`,
    },
    params: {
      page: pageNumber,
      per_page: itemsPerPage,
    },
  });

  return response.data;
};

export default fetchMovies;

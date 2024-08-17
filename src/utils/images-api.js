import axios from "axios";

const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';

const options = {
  headers: {
	
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDhlOTU4N2MzYTZhOWZiYTE2NjgxZTM0NDAxMzc2ZCIsIm5iZiI6MTcyMzkwNDQyMi45MDcxNzEsInN1YiI6IjY2YzBhZTU1OWRiZGZhOWQyMWRlYjQyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RyJ--03A27MeG1Of7RK8fgJ8J0RgPyfkGJWangr-8oM'
  }
};





const fetchFilmsWithTopic = async (topic, pageNumber = 1) => {
  const response = await axios.get(url, options);

  return response.data;
};

export default fetchFilmsWithTopic;

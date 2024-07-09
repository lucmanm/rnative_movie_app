
export const fetchTopRatedMovies = async () => {

  const url = `${process.env.EXPO_PUBLIC_THE_MOVIE_DB_API_URL}/3/movie/top_rated?language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_THE_MOVIE_DB_API_KEY}`
    }
  };

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error("FAILED_FETCH_TOP_RATED_MOVIES")
  }
  const data = await response.json()
  return data.results

}


export const getMoviesDetails = async (movie_id: number) => {
  const url = `${process.env.EXPO_PUBLIC_THE_MOVIE_DB_API_URL}/3/movie/${movie_id}?language=en-US`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_THE_MOVIE_DB_API_KEY}`
    }
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error("FAILED_FETCH_TOP_RATED_MOVIES")
  }

  const data = await response.json()
  return data


}
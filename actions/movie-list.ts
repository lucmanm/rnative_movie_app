
// get all the upcomming movies
export const getUpcomingMovies = async ({ pageParam }: any) => {

  const url = `${process.env.EXPO_PUBLIC_THE_MOVIE_DB_API_URL}/3/movie/upcoming?language=en-US&page=${pageParam}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_THE_MOVIE_DB_API_KEY}`
    }
  };

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error("FAILED_FETCH_UPCOMING_MOVIES")
  }

  const data = await response.json()
  return data.results

}
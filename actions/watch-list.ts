
// Bookmark or save movie into watchlist movies
export const saveMovieToWatcList = async (media_id: string) => {


    const url = `${process.env.EXPO_PUBLIC_THE_MOVIE_DB_API_URL}/3/account/${[process.env.EXPO_PUBLIC_THE_MOVIE_DB_ACCOUNT_ID]}/watchlist`;

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_THE_MOVIE_DB_API_KEY}`
        },
        body: JSON.stringify({ media_type: 'movie', media_id, watchlist: true })
    };


    const response = await fetch(url, options)

    if (!response.ok) {
        throw new Error("FAILED_SAVE_TO_WATCHLIST_MOVIES")
    }

    const data = await response.json()
    return data
}
// get all data from watchlist movies

export const getWatchListMovies = async () => {

    const url = `${process.env.EXPO_PUBLIC_THE_MOVIE_DB_API_URL}/3/account/21050184/watchlist/movies?language=en-US&page=1&sort_by=created_at.desc`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_THE_MOVIE_DB_API_KEY}`
        }
    };
    const response = await fetch(url, options)

    if (!response.ok) {
        throw new Error("FAILED_SAVE_TO_WATCHLIST_MOVIES")
    }

    const data = await response.json()
    return data.results
}

// Delete movie from watchlist

export const deleteWatchListMovies = async (media_id: number) => {

    const url = `${process.env.EXPO_PUBLIC_THE_MOVIE_DB_API_URL}/3/movie/${media_id}/rating`;
    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_THE_MOVIE_DB_API_KEY}`
      }
    };
    console.log(media_id);

    const response = await fetch(url, options)

    if (!response.ok) {
        throw new Error("FAILED_SAVE_TO_WATCHLIST_MOVIES")
    }

    const data = await response.json()
    return data
}
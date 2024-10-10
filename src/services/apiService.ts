import axios from "axios";


const API_KEY = process.env.REACT_APP_TMDB_API_KEY
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`;

export const fetchMovies = async () => {
    const response = await axios.get(API_URL);
    return response.data.results;
};

export const fetchTrailers = async (id:number) => {
    const apiTrailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
    const response = await axios.get(apiTrailerUrl);
    return response.data.results;
};

export const fetchGenres = async () => {
    const apiGenreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr`;
    const response = await axios.get(apiGenreUrl);
    return response.data.genres;
}
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

export const fetchLangues = async () => {
    const apiLangueUrl = `https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`;
    const response = await axios.get(apiLangueUrl);
    return response.data
}

export const fetchMoviesByFilters = async ({ year, genre, language }: {year?: string, genre?: string, language?: string}) => {
    const API_DISCOVER_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr-FR&sort_by=popularity.desc`
    let url = API_DISCOVER_URL;

    if (year) url += `&primary_release_year=${year}`;
    if (genre) url += `&with_genres=${genre}`;
    if (language) url += `&with_original_language=${language}`;

    const response = await axios.get(url)
    return response.data.results
}
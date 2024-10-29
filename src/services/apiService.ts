import axios from "axios"; // Import axios for making HTTP requests

// Retrieve the API key from environment variables
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
// Base URL for fetching popular movies
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`;

/**
 * Fetches a list of popular movies from The Movie Database (TMDb).
 * @returns {Promise<Array>} A promise that resolves to an array of popular movies.
 */
export const fetchMovies = async () => {
    const response = await axios.get(API_URL); // Make a GET request to the TMDb API
    return response.data.results; // Return the array of movie results
};

/**
 * Fetches movie trailers for a specific movie by its ID.
 * @param {number} id - The ID of the movie for which trailers are to be fetched.
 * @returns {Promise<Array>} A promise that resolves to an array of trailers for the specified movie.
 */
export const fetchTrailers = async (id: number) => {
    // Construct the API URL for fetching trailers using the movie ID
    const apiTrailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
    const response = await axios.get(apiTrailerUrl);
    return response.data.results;
};

/**
 * Fetches a list of movie genres from The Movie Database (TMDb).
 * @returns {Promise<Array>} A promise that resolves to an array of movie genres.
 */
export const fetchGenres = async () => {
    // Construct the API URL for fetching movie genres
    const apiGenreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr`;
    const response = await axios.get(apiGenreUrl);
    return response.data.genres;
};

/**
 * Fetches a list of available languages from The Movie Database (TMDb).
 * @returns {Promise<Array>} A promise that resolves to an array of available languages.
 */
export const fetchLangues = async () => {
    // Construct the API URL for fetching languages
    const apiLangueUrl = `https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`;
    const response = await axios.get(apiLangueUrl);
    return response.data;
};

/**
 * Fetches movies based on specified filters such as year, genre, and language.
 * @param {{ year?: string, genre?: string, language?: string }} filters - An object containing optional filters for the movie search.
 * @returns {Promise<Array>} A promise that resolves to an array of filtered movies.
 */
export const fetchMoviesByFilters = async ({ year, genre, language }: { year?: string, genre?: string, language?: string }) => {
    // Base URL for discovering movies with filters
    const API_DISCOVER_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr-FR&sort_by=popularity.desc`;
    let url = API_DISCOVER_URL; // Initialize the URL with the base discover URL

    // Append filter parameters to the URL if provided
    if (year) url += `&primary_release_year=${year}`; // Add year filter if specified
    if (genre) url += `&with_genres=${genre}`; // Add genre filter if specified
    if (language) url += `&with_original_language=${language}`; // Add language filter if specified

    const response = await axios.get(url); // Make a GET request to the constructed URL
    return response.data.results; // Return the array of movie results based on filters
};
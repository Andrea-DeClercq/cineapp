import { useEffect, useState } from "react";
import { fetchMoviesByFilters } from "../services/apiService";

/**
 * Custom hook `useMovies` manages state and operations related to movies and the logged-in user.
 * @returns {Object} - The movies list, user data, and a function to fetch movies by filters.
 */
const useMovies = () => {
    // State for storing fetched movies and the current logged-in user data
    const [movies, setMovies] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

    /**
     * Fetches movies based on provided filters and updates the movies state.
     * @param {Object} filters - Filtering criteria for movies.
     * @param {string} [filters.year] - Year of movie release (optional).
     * @param {string} [filters.genre] - Genre of the movies (optional).
     * @param {string} [filters.language] - Language of the movies (optional).
     * @returns {Promise<void>} - A promise that resolves when movies are fetched and state is updated.
     */
    const getMoviesByFilters = async ({ year, genre, language }: { year?: string, genre?: string, language?: string }) => {
        const filteredMovies = await fetchMoviesByFilters({ year, genre, language });
        setMovies(filteredMovies); // Update movies state with fetched data
    };

    /**
     * Effect hook to retrieve logged-in user data from local storage.
     * This runs only once when the component using this hook mounts.
     */
    useEffect(() => {
        const loggedInUser = localStorage.getItem("userLoggedIn");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    // Return movies, user, and the filtering function to be used in components
    return { movies, user, getMoviesByFilters };
};

export default useMovies;

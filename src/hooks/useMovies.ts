import { useEffect, useState } from "react";
import { fetchMoviesByFilters } from "../services/apiService";

const useMovies = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

    const getMoviesByFilters = async ({ year, genre, language }: { year?: string, genre?: string, language?: string }) => {
        const filteredMovies = await fetchMoviesByFilters({ year, genre, language });
        setMovies(filteredMovies);
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userLoggedIn");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    return { movies, user, getMoviesByFilters };
};

export default useMovies;

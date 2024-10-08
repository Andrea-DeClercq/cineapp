import { useEffect, useState } from "react";
import { fetchMovies } from "../services/apiService";

const useMovies = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const getMovies = async () => {
            const movieData = await fetchMovies();
            setMovies(movieData);
        };

        const loggedInUser = localStorage.getItem("userLoggedIn");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }

        getMovies();
    }, []);

    return { movies, user };
};

export default useMovies;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MoviesPage.css";

interface Movie {
    id: number,
    title: string,
    poster_path: string
}

const MoviesPage: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [movies, setMovies] = useState<any>([]);


    useEffect(() => {
        const loggedInUser = localStorage.getItem('userLoggedIn');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
            const fetchMovies = async () => {
                try {
                    const apiKey = '580c5e12f078a8a9ea2d0ce91a57846e';
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`);
                    setMovies(response.data.results);
                } catch (error) {
                    console.error("Erreur lors de la récupération des films:", error);
                }
            };

            fetchMovies();
        }
    }, []);

    return (
        <div className="movies-container">
            {user ? (
                <>
                    <div className="user-greeting">
                        Bonjour, {user.username} !
                    </div>
                    
                    <h2>Films populaires</h2>
                    <div className="movies-list">
                        {movies.map((movie: Movie) => (
                            <div key={movie.id} className="movie-item">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                                <div className="movie-title">{movie.title}</div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div>
                    <h1>Veuillez vous connecter pour voir les films.</h1>
                    <a href="/login" className="login-button">Se connecter</a>
                </div>
            )}
        </div>
    );
};

export default MoviesPage;

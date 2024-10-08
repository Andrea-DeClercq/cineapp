import React from "react";
import useMovies from "../hooks/useMovies";
import "../styles/MoviesPage.css";

interface Movie {
    id: number,
    title: string,
    poster_path: string
}

const MoviesPage: React.FC = () => {
    const {user, movies} = useMovies()

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

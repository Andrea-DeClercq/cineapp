import React, { useState, memo } from "react";
import useMovies from "../hooks/useMovies";
import "../styles/MoviesPage.css";
import MovieModal from "../components/MovieModal";

interface Movie {
    id: number,
    title: string,
    poster_path: string
}

const MoviesPage: React.FC = memo(() => {
    const {user, movies} = useMovies()
    const [selectedMovie, setSelectedMovie] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleMovieClick = (movie: any) => {
        setSelectedMovie(movie)
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
    }

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
                            <div key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie)}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                                <div className="movie-title">{movie.title}</div>
                            </div>
                        ))}
                        {isModalOpen && selectedMovie && (
                            <MovieModal movie={selectedMovie} onClose={closeModal} />
                        )}
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
});

export default MoviesPage;

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
        <div className="p-4 bg-gray-800 min-h-screen">
          {user ? (
            <>
              <div className="text-white text-xl mb-4">
                Bonjour, {user.username} !
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-6">Films populaires</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie: Movie) => (
                  <div 
                    key={movie.id} 
                    className="movie-item cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => handleMovieClick(movie)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <div className="movie-title text-white text-center mt-2 font-semibold">{movie.title}</div>
                  </div>
                ))}
                {isModalOpen && selectedMovie && (
                  <MovieModal movie={selectedMovie} onClose={closeModal} />
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-white">
              <h1 className="text-2xl font-bold mb-4">Veuillez vous connecter pour voir les films.</h1>
              <a href="/login" className="inline-block bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 hover:bg-red-500">
                Se connecter
              </a>
            </div>
          )}
        </div>
      );      
});

export default MoviesPage;

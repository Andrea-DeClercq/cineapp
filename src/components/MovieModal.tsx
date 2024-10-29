import React, { useState, useEffect, useMemo, useRef } from "react";
import { fetchTrailers, fetchGenres } from "../services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

/**
 * MovieModal component displays detailed information about a movie in a modal,
 * including its trailers, genres, and a favorite toggle feature.
 */
const MovieModal: React.FC<{ movie: any; onClose: () => void }> = ({ movie, onClose }) => {
    const [trailers, setTrailers] = useState<any[]>([]);
    const [genres, setGenres] = useState<any[]>([]);
    const [isFetched, setIsFetched] = useState(false); // Flag to check if trailers and genres are loaded
    const [isFav, setIsFav] = useState(false); // Favorite status of the movie
    const modalRef = useRef<HTMLDivElement>(null); // Reference to the modal for detecting clicks outside

    /**
     * Adds event listener for detecting clicks outside the modal to close it.
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    /**
     * Fetches trailers and genres for the selected movie.
     * Sets `isFetched` to true after loading data to prevent re-fetching.
     */
    useEffect(() => {
        const getTrailers = async () => {
            if (!isFetched) {
                const trailerData = await fetchTrailers(movie.id);
                const genreNames = await fetchGenres();
                setGenres(genreNames);
                setTrailers(trailerData);
                setIsFetched(true);
            }
        };
        
        getTrailers();
    }, [movie.id, isFetched]);

    /**
     * Checks if the movie is already in the user's favorite list upon loading.
     * Updates `isFav` state accordingly.
     */
    useEffect(() => {
        const storedUser = localStorage.getItem('userLoggedIn');
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (user && user.favoriteMovies) {
            const isFavorite = user.favoriteMovies.some((favMovie: any) => favMovie.id === movie.id);
            setIsFav(isFavorite);
        }
    }, [movie.id]);

    /**
     * Toggles the movie's favorite status. Adds/removes the movie from `user.favoriteMovies`.
     * Updates the `isFav` state to reflect the favorite status.
     */
    const handleFavoriteToggle = () => {
        const storedUser = localStorage.getItem('userLoggedIn');
        let user = storedUser ? JSON.parse(storedUser) : null;

        if (user) {
            if (!user.favoriteMovies) {
                user.favoriteMovies = [];
            }

            let updatedFavorites;
            if (isFav) {
                updatedFavorites = user.favoriteMovies.filter((favMovie: any) => favMovie.id !== movie.id);
                setIsFav(false);
            } else {
                updatedFavorites = [...user.favoriteMovies, movie];
                setIsFav(true);
            }

            user = { ...user, favoriteMovies: updatedFavorites };
            localStorage.setItem('userLoggedIn', JSON.stringify(user));
        }
    };

    /**
     * Randomly selects one trailer from the fetched trailers for display.
     * Uses `useMemo` to cache the result until `trailers` changes.
     */
    const randomTrailer = useMemo(() => {
        return trailers.length > 0 ? trailers[Math.floor(Math.random() * trailers.length)] : null;
    }, [trailers]);

    /**
     * Maps movie genre IDs to genre names and creates a comma-separated string.
     * Uses `useMemo` to recalculate only when `genres` or `movie.genre_ids` changes.
     */
    const listGenres = useMemo(() => {
        return genres
            .filter((genre: any) => movie.genre_ids.includes(genre.id))
            .map((genre: any) => genre.name)
            .join(", ");
    }, [genres, movie.genre_ids]);

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 w-screen h-screen bg-black bg-opacity-80">
            <div ref={modalRef} className="bg-gray-900 w-11/12 md:w-1/3 lg:w-1/4 p-6 rounded-lg shadow-lg transform transition-all duration-300 relative">
                <button 
                    className="absolute top-4 left-4 text-white focus:outline-none"
                    onClick={handleFavoriteToggle}
                >
                    <FontAwesomeIcon 
                        icon={isFav ? solidHeart : regularHeart} 
                        className="text-red-500 text-3xl"
                    />
                </button>
                <span className="close-button text-3xl leading-none cursor-pointer text-white hover:text-red-500 absolute top-4 right-4" onClick={() => {
                    onClose();
                    setIsFetched(false);
                }}>
                    &times;
                </span>

                {/* Modal content for movie details */}
                <h2 className="text-2xl font-bold text-white mb-2 text-center"><strong>{movie.title}</strong></h2>
                <p className="text-gray-300 mb-4"><strong>Synopsis:</strong> {movie.overview}</p>
                <p className="text-gray-400 mb-2"><strong>Genres:</strong> {listGenres}</p>
                <p className="text-gray-400 mb-2"><strong>Date de sortie:</strong> {movie.release_date}</p>
                <p className="text-gray-400 mb-4"><strong>Note:</strong> {movie.vote_average.toFixed(1)}/10</p>
                
                {/* Display trailer if available */}
                {randomTrailer && (
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            className="w-full h-full rounded-lg border-2 border-gray-700"
                            src={`https://www.youtube.com/embed/${randomTrailer.key}`}
                            title="Trailer"
                            frameBorder="0"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieModal;
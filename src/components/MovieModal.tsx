import React, { useState, useEffect, useMemo } from "react";
// import "../styles/MovieModal.css";
import { fetchTrailers, fetchGenres } from "../services/apiService";

const MovieModal: React.FC<{ movie: any; onClose: () => void }> = ({ movie, onClose }) => {
    const [trailers, setTrailers] = useState<any[]>([]);
    const [genres, setGenres] = useState<any[]>([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        const getTrailers = async () => {
            if (!isFetched) {
                const trailerData = await fetchTrailers(movie.id);
                const genreNames = await fetchGenres()
                setGenres(genreNames)
                setTrailers(trailerData);
                setIsFetched(true);
            }
        };
    
        getTrailers();
    }, [movie.id, isFetched]);

    const randomTrailer = useMemo(() => {
        return trailers.length > 0 ? trailers[Math.floor(Math.random() * trailers.length)] : null;
    }, [trailers])
    const listGenres = useMemo(() => {
        return genres
            .filter((genre: any) => movie.genre_ids.includes(genre.id))
            .map((genre: any) => genre.name)
            .join(", ");
    }, [genres, movie.genre_ids]);

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 w-screen h-screen bg-black bg-opacity-80">
          <div className="bg-gray-900 w-11/12 md:w-1/3 lg:w-1/4 p-6 rounded-lg shadow-lg transform transition-all duration-300">
            <span className="close-button text-3xl leading-none cursor-pointer text-white hover:text-red-500" onClick={() => {
                onClose();
                setIsFetched(false);
              }}>
              &times;
            </span>
            <h2 className="text-2xl font-bold text-white mb-2"><strong>{movie.title}</strong></h2>
            <p className="text-gray-300 mb-4"><strong>Synopsis:</strong> {movie.overview}</p>
            <p className="text-gray-400 mb-2"><strong>Genres:</strong> {listGenres}</p>
            <p className="text-gray-400 mb-2"><strong>Date de sortie:</strong> {movie.release_date}</p>
            <p className="text-gray-400 mb-4"><strong>Note:</strong> {movie.vote_average.toFixed(1)}/10</p>
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

import React, { useState, useEffect, useMemo } from "react";
import "../styles/MovieModal.css";
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
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={() => {
                        onClose();
                        setIsFetched(false);
                    }}>
                    &times;
                </span>
                <h2>{movie.title}</h2>
                <p><strong>Synopsis:</strong> {movie.overview}</p>
                <p><strong>Genres:</strong> {listGenres}</p>
                <p><strong>Date de sortie:</strong> {movie.release_date}</p>
                <p><strong>Note:</strong> {movie.vote_average}/10</p>
                {randomTrailer && (
                    <div className="trailer-container">
                        <iframe
                            width="100%"
                            height="315"
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

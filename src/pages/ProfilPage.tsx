import React, { useState } from "react";
import Navbar from "../components/Navbar"; // Importer la Navbar
import MovieModal from "../components/MovieModal"; // Importer MovieModal

const ProfilePage: React.FC = () => {
    const user = JSON.parse(localStorage.getItem("userLoggedIn") || "{}");
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMovieClick = (movie: any) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
    };

    const clearFavorites = () => {
        if (window.confirm("Êtes-vous sûr de vouloir vider vos films favoris ?")) {
            const updatedUser = { ...user, favoriteMovies: [] };
            localStorage.setItem("userLoggedIn", JSON.stringify(updatedUser));
            window.location.reload(); // Recharger la page pour mettre à jour la liste des favoris
        }
    };

    return (
        <div className="min-h-screen bg-gray-800">
            {/* Ajout de la Navbar */}
            <Navbar username={user.username} />

            <div className="p-4">
                <h2 className="text-3xl font-bold text-white mb-4">Mon Profil</h2>
                <div className="text-white">
                    <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
                    <p><strong>Email :</strong> {user.email}</p>
                </div>
                <h3 className="text-2xl font-bold text-white mt-6">Films favoris</h3>
                <button
                    className="mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 hover:bg-red-500"
                    onClick={clearFavorites}
                >
                    Vider la liste des favoris
                </button>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                    {user.favoriteMovies && user.favoriteMovies.length > 0 ? (
                        user.favoriteMovies.map((movie: any) => (
                            <div
                                key={movie.id}
                                className="text-white cursor-pointer transition-transform transform hover:scale-105"
                                onClick={() => handleMovieClick(movie)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-auto rounded-lg shadow-md"
                                />
                                <div className="movie-title text-center mt-2 font-semibold">{movie.title}</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">Aucun film favori pour le moment.</p>
                    )}
                </div>

                {/* Movie Modal */}
                {isModalOpen && selectedMovie && (
                    <MovieModal movie={selectedMovie} onClose={closeModal} />
                )}
            </div>
        </div>
    );
};

export default ProfilePage;

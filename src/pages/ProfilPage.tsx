import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MovieModal from "../components/MovieModal";

const ProfilePage: React.FC = () => {
    // Charger les informations de l'utilisateur depuis le localStorage
    const storedUser = JSON.parse(localStorage.getItem("userLoggedIn") || "{}");
    const [user, setUser] = useState<any>(storedUser);
    const [username, setUsername] = useState(user.username || "");
    const [email, setEmail] = useState(user.email || "");
    const [password, setPassword] = useState("");

    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveChanges = () => {
        const updatedUser = { ...user, username, email, password };
        localStorage.setItem("userLoggedIn", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Modifications sauvegardées !");
    };

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
            setUser(updatedUser); // Mettre à jour l'état sans recharger la page
        }
    };

    return (
        <div className="min-h-screen bg-gray-800">
            <Navbar username={user.username} />

            <div className="p-4">
                <h2 className="text-3xl font-bold text-white mb-4">Mon Profil</h2>
                <form className="space-y-4">
                    <div>
                        <label className="text-white block">Nom d'utilisateur :</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-2 rounded bg-gray-700 text-white w-full"
                        />
                    </div>
                    <div>
                        <label className="text-white block">Email :</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 rounded bg-gray-700 text-white w-full"
                        />
                    </div>
                    <div>
                        <label className="text-white block">Mot de passe :</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 rounded bg-gray-700 text-white w-full"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-500"
                    >
                        Sauvegarder les modifications
                    </button>
                </form>

                {/* Liste des films favoris */}
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

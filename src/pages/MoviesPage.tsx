import React, { useState, memo, useEffect } from "react";
import useMovies from "../hooks/useMovies";
import "../styles/MoviesPage.css";
import MovieModal from "../components/MovieModal";
import Navbar from "../components/Navbar";  
import { fetchGenres, fetchLangues } from "../services/apiService";

/**
 * MoviesPage component displays a list of popular movies with search and filter options.
 * Allows users to filter movies by year, genre, and language and save their filter choices in localStorage.
 * Displays movie details in a modal upon selection.
 */
const MoviesPage: React.FC = memo(() => {
    const { user, movies, getMoviesByFilters } = useMovies();  // Retrieve user info, movies list, and filter function
    const [selectedMovie, setSelectedMovie] = useState<any>(null);  // Selected movie for the modal display
    const [isModalOpen, setIsModalOpen] = useState(false);  // Controls modal visibility
    const [searchTerm, setSearchTerm] = useState("");  // Search term for filtering movie titles
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [genres, setGenres] = useState<any[]>([]);  // List of available genres for filtering
    const [languages, setLanguages] = useState<any[]>([]);  // List of available languages for filtering

    /**
     * Opens the modal and sets the selected movie when a movie item is clicked.
     * 
     * @param {any} movie - The selected movie object to be displayed in the modal.
     */
    const handleMovieClick = (movie: any) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    /** Closes the modal and resets the selected movie. */
    const closeModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
    };

    /** Updates the search term for filtering movie titles. */
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    /** Fetches genres and languages for filtering options from API on component mount. */
    useEffect(() => {
        const fetchFilters = async () => {
            const fetchedGenres = await fetchGenres();
            let fetchedLanguages = await fetchLangues();
            fetchedLanguages = fetchedLanguages.sort((a: any, b: any) => 
                a.english_name.localeCompare(b.english_name)
            );
            setGenres(fetchedGenres);
            setLanguages(fetchedLanguages);
        };

        fetchFilters();
    }, []);

    /** Loads filter preferences from localStorage if available. */
    useEffect(() => {
        const savedFilters = localStorage.getItem("movieFilters");
        if (savedFilters) {
            const filters = JSON.parse(savedFilters);
            setSelectedYear(filters.year || undefined);
            setSelectedGenre(filters.genre || undefined);
            setSelectedLanguage(filters.language || undefined);
        }
    }, []);

    /**
     * Updates the movies list based on selected filters and saves filters to localStorage.
     */
    useEffect(() => {
        const filters = {
            year: selectedYear || undefined,
            genre: selectedGenre || undefined,
            language: selectedLanguage || undefined,
        };
        localStorage.setItem("movieFilters", JSON.stringify(filters));  // Save filters for future visits
        getMoviesByFilters(filters);  // Fetch movies with selected filters
    }, [selectedYear, selectedGenre, selectedLanguage, getMoviesByFilters]);

    // Handlers for year, genre, and language selection dropdowns
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedYear(e.target.value);
    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedGenre(e.target.value);
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedLanguage(e.target.value);

    /** Filters movies based on the search term input. */
    const filteredMovies = movies.filter((movie: any) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 bg-gray-800 min-h-screen">
          {user ? (
            <>
                <Navbar username={user.username} />
                <div className="p-4">
                    <div className="flex">
                        <h2 className="text-3xl font-bold text-white mb-6">Films populaires</h2>
                        <input
                            type="text"
                            placeholder="Rechercher un film..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="mb-4 p-2 rounded ml-auto"
                        />
                    </div>
                    <div className="my-4 flex flex-col sm:flex-row gap-4">
                        <select className="bg-gray-700 text-white p-2 rounded" onChange={handleYearChange} value={selectedYear || ""}>
                            <option value="">Toutes les années</option>
                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>

                        <select className="bg-gray-700 text-white p-2 rounded" onChange={handleGenreChange} value={selectedGenre || ""}>
                            <option value="">Tous les genres</option>
                            {genres.map(genre => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>

                        <select className="bg-gray-700 text-white p-2 rounded" onChange={handleLanguageChange} value={selectedLanguage || ""}>
                            <option value="">Toutes les langues</option>
                            {languages.map(language => (
                                <option key={language.iso_639_1} value={language.iso_639_1}>
                                    {language.english_name} ({language.iso_639_1})
                                </option>
                            ))}
                        </select>
                    </div>
                  
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredMovies.map((movie) => (
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
                          <MovieModal movie={selectedMovie} onClose={closeModal} />  // Modal display of selected movie
                        )}
                    </div>
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
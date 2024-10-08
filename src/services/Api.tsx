import axios from "axios";

export const fetchMovies = async () => {
    try {
        const apiKey = '580c5e12f078a8a9ea2d0ce91a57846e';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`);
        return response
    } catch (error) {
        console.error("Erreur lors de la récupération des films:", error);
        return null;
    }
};
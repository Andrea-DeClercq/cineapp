import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function to generate unique IDs

const RegisterPage: React.FC = () => {
    // State variables to hold user input for username, email, and password
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create a new user object with a unique ID and the input values
        const newUser = {
            id: uuidv4(), // Generate a unique ID for the user
            username,
            email,
            password,
        };

        // Store the new user object in local storage
        localStorage.setItem('user', JSON.stringify(newUser));

        // Clear the input fields
        setUsername('');
        setEmail('');
        setPassword('');

        // Notify the user of successful registration and redirect the user to the login page
        alert('Inscription réussie !');
        window.location.href = '/login';
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Inscription</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        className="input-field w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="Nom d'utilisateur"
                        value={username} // Value bound to the username state
                        onChange={(e) => setUsername(e.target.value)} // Update username state on input change
                        required
                    />
                    <input
                        type="email"
                        className="input-field w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="Email"
                        value={email} // Value bound to the email state
                        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                        required
                    />
                    <input
                        type="password"
                        className="input-field w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="Mot de passe"
                        value={password} // Value bound to the password state
                        onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                        required
                    />
                    <button type="submit" className="submit-button w-full p-3 bg-red-600 text-white font-semibold rounded-md transition-colors duration-300 hover:bg-red-500">
                        S'inscrire
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <a href="/login" className="redirect-link text-red-400 hover:underline">
                        Déjà un compte ? Se connecter
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
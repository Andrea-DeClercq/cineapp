import React, { useState } from "react";

interface LoginPageProps {
    onLoginSuccess?: () => void;  // Optional callback triggered upon successful login
}

/**
 * LoginPage component handles user login functionality.
 * Allows users to enter email and password, verifies credentials, 
 * and stores session information in localStorage upon successful login.
 * 
 * @param {LoginPageProps} props - Contains optional callback for login success handling.
 * @returns {JSX.Element} - The rendered login page.
 */
const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');  // State for the email input field
    const [password, setPassword] = useState('');  // State for the password input field
    const [error, setError] = useState('');  // State to display login error messages

    /**
     * handleSubmit processes the form submission by validating the user's credentials.
     * If credentials match, it stores user data in localStorage and redirects to movies page.
     * 
     * @param {React.FormEvent} e - The form submission event.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);

            if (user.email === email && user.password === password) {
                localStorage.setItem('userLoggedIn', JSON.stringify(user));  // Store login session

                // Trigger callback if provided, otherwise redirect to movies page
                if (onLoginSuccess) {
                    onLoginSuccess();
                } else {
                    alert('Connexion réussie !');
                    window.location.href = "/movies";
                }
            } else {
                setError('Email ou mot de passe incorrect');  // Set error message if credentials don't match
            }
        } else {
            setError('Aucun utilisateur trouvé. Veuillez vous inscrire d\'abord.');  // Prompt if no user exists
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Connexion</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="input-field w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="input-field w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="submit-button w-full p-3 bg-red-600 text-white font-semibold rounded-md transition-colors duration-300 hover:bg-red-500">
                        Se connecter
                    </button>
                </form>
                
                <div className="mt-4 text-center">
                    <a href="/register" className="redirect-link text-red-400 hover:underline">
                        Pas de compte ? S'inscrire
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
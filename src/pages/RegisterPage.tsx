import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import '../styles/RegisterPage.css';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newUser = {
            id: uuidv4(),
            username,
            email,
            password,
        };

        localStorage.setItem('user', JSON.stringify(newUser));

        setUsername('');
        setEmail('');
        setPassword('');

        alert('Inscription réussie !')
        window.location.href = '/login';
    };

    return (
        <div className="form-container">
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    className="input-field"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="input-field"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">S'inscrire</button>
            </form>
            <a href="/login" className="redirect-link">Déjà un compte ? Se connecter</a>
        </div>
    );
};

export default RegisterPage;
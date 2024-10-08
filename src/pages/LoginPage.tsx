import React, {useState} from "react";
import '../styles/LoginPage.css'

const LoginPage: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);

            if (user.email === email && user.password === password) {
                localStorage.setItem('userLoggedIn', JSON.stringify(user));

                alert('Connexion réussie !');
                window.location.href = "/movies";
            } else {
                setError('Email ou mot de passe incorrect');
            }
        } else {
            setError('Aucun utilisateur trouvé. Veuillez vous inscrire d\'abord.');
        }
    };
    
    return (
        <div className="form-container">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="submit-button">Se connecter</button>
            </form>
            <a href="/register" className="redirect-link">Pas de compte ? S'inscrire</a>
        </div>
    );
}

export default LoginPage;
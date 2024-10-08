import React from 'react';
import YouTube from 'react-youtube';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
    const videoOptions = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            mute: 1, // Mute pour qu'il soit sans son
            loop: 1,
            playlist: 's3ZLUh0N9zs' // Ajoutez l'ID de la vidéo pour le loop
        }
    };

    return (
        <div className="home-container">
            <div className="video-background">
                <YouTube videoId="s3ZLUh0N9zs" opts={videoOptions} className="background-video" />
            </div>
            <div className="overlay">
                <h1>Bienvenue sur notre site !</h1>
                <div className="button-container">
                    <a href="/login" className="login-button">Login</a>
                    <a href="/register" className="register-button">Register</a>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

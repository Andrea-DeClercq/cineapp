import React from 'react';
import YouTube from 'react-youtube';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {

    const videoOptions = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: 's3ZLUh0N9zs'
        }
    };

    return (
      <div className="home-container">
        <div className="video-background">
          <YouTube videoId="s3ZLUh0N9zs" opts={videoOptions} className="background-video" />
        </div>
        <div className="overlay">
          <h1>Bienvenue sur CineAPP</h1>
          <div className="button-container">
            <a href="/login">
                <button>Login</button>
            </a>
            <a href="/register">
                <button>Register</button>
            </a>
        </div>
        </div>
      </div>
    );
};

export default HomePage;

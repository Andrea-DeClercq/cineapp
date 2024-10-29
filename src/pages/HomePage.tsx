import React from 'react';
import YouTube from 'react-youtube';
import '../styles/HomePage.css';

/**
 * HomePage component displays a background video and provides options for
 * users to navigate to the Login or Register pages.
 * @returns {JSX.Element} - The rendered homepage with a background video and navigation links.
 */
const HomePage: React.FC = () => {
    // Video options for configuring the YouTube background video player
    const videoOptions = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1, // Automatically start playing the video
            mute: 1, // Mute video by default
            loop: 1, // Loop the video
            playlist: 's3ZLUh0N9zs' // Specify video ID for looping
        }
    };

    return (
        <div className="home-container">
            {/* Video Background */}
            <div className="video-background">
                {/* Embeds a YouTube video as the background using the specified options */}
                <YouTube videoId="s3ZLUh0N9zs" opts={videoOptions} className="background-video" />
            </div>
            
            {/* Overlay Content */}
            <div className="overlay">
                <h1>Bienvenue sur notre site !</h1>
                
                {/* Navigation buttons for Login and Register */}
                <div className="button-container">
                    <a href="/login" className="login-button">Login</a>
                    <a href="/register" className="register-button">Register</a>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

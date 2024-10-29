import React from "react";
import { Link } from "react-router-dom";  // Make sure react-router-dom is installed for link navigation

/**
 * NavbarProps interface defines the expected props for the Navbar component.
 * @property {string} username - The username of the logged-in user.
 */
interface NavbarProps {
  username: string;
}

/**
 * Navbar component displays a navigation bar with a personalized greeting and links to different pages.
 */
const Navbar: React.FC<NavbarProps> = ({ username }) => {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <div className="text-white text-lg">
        Bonjour, {username} !
      </div>

      {/* Navigation links to Profile and Movies pages */}
      <div>
        <Link to="/profile" className="text-white hover:underline mr-4">
          Mon Profil
        </Link>
        <Link to="/movies" className="text-white hover:underline">
          Films Populaires
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";  // Assurez-vous que react-router-dom est installé

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <div className="text-white text-lg">
        Bonjour, {username} !
      </div>
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

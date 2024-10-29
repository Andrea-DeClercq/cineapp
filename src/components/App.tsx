import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Importing different pages used in the application.
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import MoviesPage from "../pages/MoviesPage";
import ProfilePage from "../pages/ProfilPage";
import HelloWorldPage from "../pages/HelloWorldPage";

/**
 * Main component for the application.
 * This component handles routing across different pages using React Router.
 * Routes are defined for each page in the application.
 */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* Route for the authentification part used in the application */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Route for the Hello World Page, used for unit tests */}
        <Route path="/helloWorld" element={<HelloWorldPage />} />
      </Routes>
    </Router>
  );
}

export default App;

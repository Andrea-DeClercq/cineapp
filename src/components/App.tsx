import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage";
import MoviesPage from "../pages/MoviesPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage /> }/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies" element={<MoviesPage />}/>
      </Routes>
    </Router>
  )
}
export default App;

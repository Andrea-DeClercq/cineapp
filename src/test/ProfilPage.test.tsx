import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProfilPage from '../pages/ProfilPage';

// Before each test, set a mock user in local storage to simulate a logged-in user
beforeEach(() => {
  const user = { username: 'testUser', email: 'test@example.com', favoriteMovies: [] };
  localStorage.setItem('userLoggedIn', JSON.stringify(user));
});

// After each test, remove the user from local storage to clean up
afterEach(() => {
  localStorage.removeItem('userLoggedIn');
});

// Test case to check if the ProfilPage renders correctly
test('renders ProfilPage correctly', () => {
  // Render the ProfilPage component wrapped in BrowserRouter
  render(
    <BrowserRouter>
      <ProfilPage />
    </BrowserRouter>
  );

  // Assert that the welcome message with the username is present in the document
  expect(screen.getByText(/Bonjour, testUser/i)).toBeInTheDocument();
});

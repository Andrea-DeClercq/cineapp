import { render, screen } from '@testing-library/react';
import MoviesPage from '../pages/MoviesPage';

// Clear the local storage before each test to ensure a clean state
beforeEach(() => {
  localStorage.removeItem('userLoggedIn');
});

// Test case to check if the login message is displayed when no user is logged in
test("displays the login message when no user is logged in", () => {
  render(<MoviesPage />);

  // Get the login message element by its text
  const loginMessage = screen.getByText(/Veuillez vous connecter pour voir les films/i);

  // Assert that the login message is present in the document
  expect(loginMessage).toBeInTheDocument();
});

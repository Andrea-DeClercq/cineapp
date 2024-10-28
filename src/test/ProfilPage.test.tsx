import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProfilPage from '../pages/ProfilPage';

beforeEach(() => {
  const user = { username: 'testUser', email: 'test@example.com', favoriteMovies: [] };
  localStorage.setItem('userLoggedIn', JSON.stringify(user));
});

afterEach(() => {
  localStorage.removeItem('userLoggedIn');
});

test('renders ProfilPage correctly', () => {
  render(
    <BrowserRouter>
      <ProfilPage />
    </BrowserRouter>
  );

  expect(screen.getByText(/Bonjour, testUser/i)).toBeInTheDocument();
});

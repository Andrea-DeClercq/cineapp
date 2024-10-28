import React from 'react';
import { render, screen } from '@testing-library/react';
import MoviesPage from '../pages/MoviesPage';

beforeEach(() => {
  localStorage.removeItem('userLoggedIn');
});

test("affiche le message de connexion lorsqu'aucun utilisateur n'est connecté", () => {
  render(<MoviesPage />);
  const loginMessage = screen.getByText(/Veuillez vous connecter pour voir les films/i);
  expect(loginMessage).toBeInTheDocument();
});
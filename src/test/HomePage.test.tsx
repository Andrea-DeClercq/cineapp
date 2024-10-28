import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

test('renders HomePage correctly', () => {
  render(<HomePage />);
  expect(screen.getByText(/Bienvenue/i)).toBeInTheDocument(); 
});
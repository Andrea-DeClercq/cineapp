import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterPage from '../pages/RegisterPage';

test('renders RegisterPage correctly', () => {
  render(<RegisterPage />);
  expect(screen.getByText(/Inscription/i)).toBeInTheDocument();
});

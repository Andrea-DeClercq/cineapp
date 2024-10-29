import { render, screen } from '@testing-library/react';
import RegisterPage from '../pages/RegisterPage';

// Define a test suite for the RegisterPage
test('renders RegisterPage correctly', () => {
  render(<RegisterPage />);
  // Assert that the text element is present in the document
  expect(screen.getByText(/Inscription/i)).toBeInTheDocument();
});

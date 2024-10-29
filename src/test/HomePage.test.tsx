import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

// Define a test case for the HomePage component
test('renders HomePage correctly', () => {
  // Render the HomePage component into the testing environment
  render(<HomePage />);
  
  // Assert that the text "Bienvenue" is present in the document
  expect(screen.getByText(/Bienvenue/i)).toBeInTheDocument(); 
});

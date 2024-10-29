import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

// Group related tests for the LoginPage component
describe('LoginPage', () => {
  
  // Test case to check if the LoginPage form renders correctly
  test('renders LoginPage form correctly', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Check that the login button is in the document
    expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument();
  });

  // Test case to check if the user can type into email and password fields
  test('allows user to type into email and password fields', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Get the email and password input fields by their labels
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);

    // Simulate typing into the email and password input fields
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Assert that the values in the input fields are correct
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  // TODO: Need to fix those test for checking the submit
  // test('shows error message if email or password is missing', () => {
  //   render(
  //     <BrowserRouter>
  //       <LoginPage />
  //     </BrowserRouter>
  //   );

  //   const loginButton = screen.getByRole('button', { name: /Se connecter/i });

  //   fireEvent.click(loginButton);

  //   expect(screen.getByText(/Email ou mot de passe incorrect/i)).toBeInTheDocument();
  // });

  // test('submits the form with correct email and password', () => {
  //   const mockSubmit = jest.fn();

  //   render(
  //     <BrowserRouter>
  //       <LoginPage onSubmit={mockSubmit} />
  //     </BrowserRouter>
  //   );

  //   const emailInput = screen.getByLabelText(/Email/i);
  //   const passwordInput = screen.getByLabelText(/Mot de passe/i);
  //   const loginButton = screen.getByRole('button', { name: /Se connecter/i });

  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password123' } });

  //   fireEvent.click(loginButton);

  //   expect(mockSubmit).toHaveBeenCalledWith({
  //     email: 'test@example.com',
  //     password: 'password123',
  //   });
  // });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

describe('LoginPage', () => {
  test('renders LoginPage form correctly', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument();
  });

  test('allows user to type into email and password fields', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

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

//   test('submits the form with correct email and password', () => {
//     const mockSubmit = jest.fn();

//     render(
//       <BrowserRouter>
//         <LoginPage onSubmit={mockSubmit} />
//       </BrowserRouter>
//     );

//     const emailInput = screen.getByLabelText(/Email/i);
//     const passwordInput = screen.getByLabelText(/Mot de passe/i);
//     const loginButton = screen.getByRole('button', { name: /Se connecter/i });

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password123' } });

//     fireEvent.click(loginButton);

//     expect(mockSubmit).toHaveBeenCalledWith({
//       email: 'test@example.com',
//       password: 'password123',
//     });
//   });
});

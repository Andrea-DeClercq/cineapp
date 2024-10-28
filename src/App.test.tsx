// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

describe('App', () => {
    const renderWithRouter = (route: string) => {
        window.history.pushState({}, 'Test page', route);
        render(
          <App />
        );
    };

    test('affiche la page Home à la route "/"', () => {
        renderWithRouter('/');
        const homePageText = screen.getByText(/Bienvenue/i);
        expect(homePageText).toBeInTheDocument();
    });

    test('affiche la page Register à la route "/register"', () => {
        renderWithRouter('/register');
        const registerPageText = screen.getByText(/Inscription/i);
        expect(registerPageText).toBeInTheDocument();
    });

    test('affiche la page Login à la route "/login"', () => {
        renderWithRouter('/login');
        const loginPageText = screen.getByText(/Connexion/i);
        expect(loginPageText).toBeInTheDocument();
    });

    test('affiche la page Movies à la route "/movies"', () => {
        renderWithRouter('/movies');
        const moviesPageText = screen.getByText(/Films/i);
        expect(moviesPageText).toBeInTheDocument();
    });

    test('affiche la page Profil à la route "/profile"', () => {
        renderWithRouter('/profile');
        const profilePageText = screen.getByText(/Films favoris/i);
        expect(profilePageText).toBeInTheDocument();
    });

    test('affiche la page HelloWorld à la route "/helloWorld"', () => {
        renderWithRouter('/helloWorld');
        const helloWorldText = screen.getByText(/hello world for unit test/i);
        expect(helloWorldText).toBeInTheDocument();
    });
});

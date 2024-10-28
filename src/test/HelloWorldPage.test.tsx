import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloWorldPage from '../pages/HelloWorldPage';
import { BrowserRouter } from 'react-router-dom';

describe('HelloWorldPage', () => {
    test('affiche le texte "Hello World for unit test"', () => {
        render(
            <BrowserRouter>
                <HelloWorldPage />
            </BrowserRouter>
        );

        const textElement = screen.getByText(/Hello World for unit test/i);
        expect(textElement).toBeInTheDocument();
    });
});

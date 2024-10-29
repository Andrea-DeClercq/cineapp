import { render, screen } from '@testing-library/react'; // Import render and screen utilities for testing
import HelloWorldPage from '../pages/HelloWorldPage'; // Import the HelloWorldPage component to be tested
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing capabilities during testing

describe('HelloWorldPage', () => {
    // Define a test suite for the HelloWorldPage component
    test('displays the text "Hello World for unit test"', () => {
        // Render the HelloWorldPage component wrapped in a BrowserRouter
        render(
            <BrowserRouter>
                <HelloWorldPage />
            </BrowserRouter>
        );

        // Query the document for the text "Hello World for unit test"
        const textElement = screen.getByText(/Hello World for unit test/i);
        // Assert that the text element is present in the document
        expect(textElement).toBeInTheDocument();
    });
});

/*
App Component Unit Tests

This file contains tests for the main App component.
It verifies that the component renders correctly and functions as expected.

Test Framework: Jest with React Testing Library
Usage: npm test (runs tests in watch mode)
*/

// ==================== IMPORTS ====================
// Testing utilities from React Testing Library
import { render, screen } from '@testing-library/react';
// Main App component to test
import App from './App';

// ==================== TEST SUITE ====================
/**
 * Basic rendering test
 * Verifies that the App component renders without crashing
 */
test('renders learn react link', () => {
  // Render the App component in virtual DOM
  render(<App />);
  
  // Find element containing "learn react" text (case-insensitive)
  const linkElement = screen.getByText(/learn react/i);
  
  // Assert that the element is in the document
  expect(linkElement).toBeInTheDocument();
});

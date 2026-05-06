/*
Jest Testing Setup and Configuration

This file configures the testing environment for the React application.
It sets up testing libraries and adds custom matchers for DOM assertions.

Used by:
- npm test: Runs test suite in watch mode
- npm run build: Validates tests during production build

Dependencies:
- @testing-library/jest-dom: Adds custom Jest matchers
- @testing-library/react: React component testing utilities
- @testing-library/user-event: User interaction simulation
*/

// ==================== JEST-DOM SETUP ====================
// Import jest-dom matchers for enhanced DOM assertions
// This allows you to use custom matchers like:
// - expect(element).toBeInTheDocument()
// - expect(element).toHaveTextContent(/text/)
// - expect(element).toBeVisible()
// - expect(element).toBeDisabled()
// - And many more...
//
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

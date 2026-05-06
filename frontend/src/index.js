/*
React Application Entry Point

This file is the starting point of the React application.
It:
1. Imports the main App component
2. Renders the app into the DOM
3. Initializes React StrictMode for development checks
4. Sets up performance monitoring
*/

// ==================== IMPORTS ====================
import React from 'react';  // React library
import ReactDOM from 'react-dom/client';  // ReactDOM for rendering
import './index.css';  // Global styles
import App from './App';  // Main App component
import reportWebVitals from './reportWebVitals';  // Performance monitoring utility

// ==================== APPLICATION SETUP ====================
// Get the root HTML element from public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// ==================== RENDER APPLICATION ====================
// Render the main App component
root.render(
  // StrictMode helps identify potential problems during development
  // It doesn't render visible UI but activates additional development checks
  <React.StrictMode>
    <App />  {/* Main application component */}
  </React.StrictMode>
);

// ==================== PERFORMANCE MONITORING ====================
// Optional: Track web vitals (performance metrics)
// Uncomment to log metrics or send to analytics service
// Learn more at: https://bit.ly/CRA-vitals
// Examples:
// - reportWebVitals(console.log);  // Log to console
// - reportWebVitals(sendToAnalytics);  // Send to custom endpoint
reportWebVitals();

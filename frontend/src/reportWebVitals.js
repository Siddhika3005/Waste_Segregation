/*
Web Vitals Performance Monitoring

This utility measures and reports Core Web Vitals metrics to help identify
performance bottlenecks in the application.

Core Web Vitals Measured:
1. CLS (Cumulative Layout Shift): Visual stability
2. FID (First Input Delay): Responsiveness to user input
3. FCP (First Contentful Paint): Speed of first content rendering
4. LCP (Largest Contentful Paint): Speed of main content rendering
5. TTFB (Time to First Byte): Server response time

Usage:
- reportWebVitals(console.log); // Log metrics to console
- reportWebVitals(sendToAnalytics); // Send to analytics service

Learn more: https://bit.ly/CRA-vitals
*/

// ==================== WEB VITALS REPORTING FUNCTION ====================
/**
 * reportWebVitals - Report Core Web Vitals performance metrics
 *
 * @param {Function} onPerfEntry - Callback function to receive performance data
 *
 * Metrics reported:
 * - getCLS: Cumulative Layout Shift (visual stability)
 * - getFID: First Input Delay (responsiveness)
 * - getFCP: First Contentful Paint (paint timing)
 * - getLCP: Largest Contentful Paint (main content timing)
 * - getTTFB: Time to First Byte (network timing)
 */
const reportWebVitals = onPerfEntry => {
  // Check if onPerfEntry is a valid function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import web-vitals library
    // (imported only when needed to reduce initial bundle size)
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Report each Core Web Vital metric
      getCLS(onPerfEntry);  // Cumulative Layout Shift
      getFID(onPerfEntry);  // First Input Delay
      getFCP(onPerfEntry);  // First Contentful Paint
      getLCP(onPerfEntry);  // Largest Contentful Paint
      getTTFB(onPerfEntry);  // Time to First Byte
    });
  }
};

// ==================== EXPORT ====================
export default reportWebVitals;

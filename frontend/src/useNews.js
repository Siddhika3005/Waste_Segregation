/*
UseNews - Custom React Hook for Fetching News Articles

This hook fetches environmental and waste-related news articles from NewsAPI.
It searches for multiple relevant topics and combines the results.

Features:
- Fetches news from multiple search queries
- Removes duplicate articles
- Handles errors gracefully
- Returns loading and error states

Environment Variables:
- REACT_APP_NEWS_API_KEY: API key from newsapi.org
*/

// ==================== IMPORTS ====================
import { useState, useEffect } from 'react';  // React hooks

// ==================== CONFIGURATION ====================
// NewsAPI key from environment variables
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
// NewsAPI endpoint for searching articles
const API_URL = 'https://newsapi.org/v2/everything';

// ==================== CUSTOM HOOK ====================
/**
 * useNews - Fetch environmental and waste management news
 *
 * Returns:
 * - articles: Array of news articles
 * - loading: Boolean indicating if data is being fetched
 * - error: Error message if fetch fails
 */
export const useNews = () => {
  // ========== STATE VARIABLES ==========
  const [articles, setArticles] = useState([]);  // Store fetched articles
  const [loading, setLoading] = useState(false);  // Loading indicator
  const [error, setError] = useState(null);  // Error message

  // ========== EFFECT HOOK ==========
  // Run once when component mounts
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        // ========== SEARCH QUERIES ==========
        // Search for multiple environmental topics
        const queries = [
          'waste segregation recycling',  // Specific to waste segregation
          'environmental sustainability',  // General environmental news
          'waste management innovation'  // Innovation in waste management
        ];
        
        // ========== FETCH FROM MULTIPLE QUERIES ==========
        // Fetch and combine articles from all search queries
        const allArticles = [];
        
        for (const query of queries) {
          // Make API request for each query
          const response = await fetch(
            `${API_URL}?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=5&apiKey=${API_KEY}`
          );
          
          // Check if response is successful
          if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
          }
          
          // Parse JSON response
          const data = await response.json();
          
          // Add articles to combined list
          if (data.articles) {
            allArticles.push(...data.articles);
          }
        }
        
        // ========== REMOVE DUPLICATES AND LIMIT ==========
        // Use Map to remove duplicate articles by title
        const uniqueArticles = Array.from(
          new Map(allArticles.map(article => [article.title, article])).values()
        ).slice(0, 12);  // Limit to 12 articles
        
        setArticles(uniqueArticles);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);  // Empty dependency array = run once on mount

  // ========== RETURN STATE ==========
  return { articles, loading, error };
};

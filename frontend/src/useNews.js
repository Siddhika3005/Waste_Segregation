import { useState, useEffect } from 'react';

const API_KEY = '4c0a127652284f7b9ddc1ab8e5422023';
const API_URL = 'https://newsapi.org/v2/everything';

export const useNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const queries = [
          'waste segregation recycling',
          'environmental sustainability',
          'waste management innovation'
        ];
        
        // Fetch from multiple queries and combine results
        const allArticles = [];
        
        for (const query of queries) {
          const response = await fetch(
            `${API_URL}?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=5&apiKey=${API_KEY}`
          );
          
          if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data.articles) {
            allArticles.push(...data.articles);
          }
        }
        
        // Remove duplicates and limit to 12 articles
        const uniqueArticles = Array.from(
          new Map(allArticles.map(article => [article.title, article])).values()
        ).slice(0, 12);
        
        setArticles(uniqueArticles);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { articles, loading, error };
};

import { useState, useEffect } from 'react';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export function useYouTube(searchQuery = 'waste segregation recycling', maxResults = 12) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);

  const fetchVideos = async (pageToken = null) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        part: 'snippet',
        q: searchQuery,
        maxResults: maxResults,
        type: 'video',
        key: YOUTUBE_API_KEY,
        order: 'relevance',
        videoCaption: 'closedCaption',
        videoEmbeddable: 'true',
        ...(pageToken && { pageToken })
      });

      // Try direct API call first
      let response = await fetch(`${YOUTUBE_API_URL}?${params}`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      
      // If CORS issue, try with CORS proxy
      if (!response.ok && response.status === 403) {
        console.log('Direct API failed, trying with CORS proxy...');
        response = await fetch(`https://cors-anywhere.herokuapp.com/${YOUTUBE_API_URL}?${params}`, {
          headers: {
            'Accept': 'application/json',
            'Origin': 'http://localhost:3000'
          }
        });
      }

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const processedVideos = data.items
          .filter(item => item.id && item.id.videoId) // Filter out invalid items
          .map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`
          }));

        setVideos(processedVideos);
        setNextPageToken(data.nextPageToken || null);
        setPrevPageToken(data.prevPageToken || null);
      } else {
        setError('No videos found');
      }
    } catch (err) {
      setError(err.message);
      console.error('YouTube fetch error:', err);
      
      // Fallback: Use sample videos for demonstration
      console.log('Using fallback sample videos...');
      setVideos(getFallbackVideos());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackVideos = () => {
    return [
      {
        id: 'waste-segregation-101',
        title: 'Waste Segregation 101: Complete Guide to Sorting Waste',
        description: 'Learn the fundamentals of waste segregation. Understand how to categorize waste into biodegradable, non-biodegradable, and hazardous categories for proper disposal.',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        channelTitle: 'Waste Management Experts',
        publishedAt: '2024-01-15T10:00:00Z',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'biodegradable-waste',
        title: 'Biodegradable Waste: What Goes Where?',
        description: 'Master the identification and proper disposal of biodegradable waste. Learn which organic materials can be composted and how to handle them correctly.',
        thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
        channelTitle: 'Eco Waste Solutions',
        publishedAt: '2024-01-14T10:00:00Z',
        url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw'
      },
      {
        id: 'non-biodegradable-sorting',
        title: 'Non-Biodegradable Waste Sorting Techniques',
        description: 'Comprehensive guide to sorting non-biodegradable materials like plastics, metals, and glass. Learn proper techniques for recycling efficiency and environmental protection.',
        thumbnail: 'https://img.youtube.com/vi/kJQDL51Dw8A/maxresdefault.jpg',
        channelTitle: 'Recycling Innovations',
        publishedAt: '2024-01-13T10:00:00Z',
        url: 'https://www.youtube.com/watch?v=kJQDL51Dw8A'
      },
      {
        id: 'hazardous-waste-handling',
        title: 'Hazardous Waste: Identification and Safe Handling',
        description: 'Learn to identify hazardous waste materials and understand proper disposal methods. Essential knowledge for safe waste management in homes and offices.',
        thumbnail: 'https://img.youtube.com/vi/VzEQ-YPjqjE/maxresdefault.jpg',
        channelTitle: 'Safety First Waste',
        publishedAt: '2024-01-12T10:00:00Z',
        url: 'https://www.youtube.com/watch?v=VzEQ-YPjqjE'
      },
      {
        id: 'home-composting-guide',
        title: 'Home Composting: Turn Waste into Gold',
        description: 'Step-by-step guide to composting biodegradable waste at home. Learn how to create nutrient-rich compost while reducing your household waste significantly.',
        thumbnail: 'https://img.youtube.com/vi/YZv8-6ZP1Gk/maxresdefault.jpg',
        channelTitle: 'Green Living At Home',
        publishedAt: '2024-01-11T10:00:00Z',
        url: 'https://www.youtube.com/watch?v=YZv8-6ZP1Gk'
      },
      {
        id: 'plastic-waste-reduction',
        title: 'Plastic Waste Segregation and Recycling Methods',
        description: 'Detailed guide on separating different types of plastics, reducing plastic waste, and understanding recycling symbols for proper waste segregation.',
        thumbnail: 'https://img.youtube.com/vi/IBRaAM1u_30/maxresdefault.jpg',
        channelTitle: 'Plastic Free Initiative',
        publishedAt: '2024-01-10T10:00:00Z',
        url: 'https://www.youtube.com/watch?v=IBRaAM1u_30'
      },
      {
        id: 'ewaste-management',
        title: 'E-Waste Management: Electronic Waste Segregation',
        description: 'Learn how to properly identify and segregate electronic waste. Understand recycling processes and environmental impact of improper e-waste disposal.',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        channelTitle: 'Tech Waste Solutions',
        publishedAt: '2024-01-09T10:00:00Z',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'waste-segregation-benefits',
        title: 'Benefits of Proper Waste Segregation',
        description: 'Discover how proper waste segregation reduces environmental impact, supports recycling efforts, and contributes to a cleaner, healthier community.',
        thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
        channelTitle: 'Environmental Impact',
        publishedAt: '2024-01-08T10:00:00Z',
        url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw'
      },
      {
        id: 'waste-segregation-laws',
        title: 'Waste Segregation Laws and Regulations',
        description: 'Understand local and national waste segregation regulations. Learn your responsibilities in proper waste disposal and segregation compliance.',
        thumbnail: 'https://img.youtube.com/vi/kJQDL51Dw8A/maxresdefault.jpg',
        channelTitle: 'Legal Waste Management',
        publishedAt: '2024-01-07T10:00:00Z',
        url: 'https://www.youtube.com/watch?v=kJQDL51Dw8A'
      },
      {
        id: 'metal-glass-paper-sorting',
        title: 'Sorting Metal, Glass, and Paper Waste',
        description: 'Expert guide on segregating and recycling metal, glass, and paper materials. Learn value recovery and proper handling techniques for each material.',
        thumbnail: 'https://img.youtube.com/vi/VzEQ-YPjqjE/maxresdefault.jpg',
        channelTitle: 'Material Recycling Pro',
        publishedAt: '2024-01-06T10:00:00Z',
        url: 'https://www.youtube.com/watch?v=VzEQ-YPjqjE'
      },
      {
        id: 'waste-segregation-myths',
        title: 'Myths and Facts About Waste Segregation',
        description: 'Debunking common myths about waste segregation. Learn the facts to make informed decisions about proper waste disposal in your daily life.',
        thumbnail: 'https://img.youtube.com/vi/YZv8-6ZP1Gk/maxresdefault.jpg',
        channelTitle: 'Waste Education Hub',
        publishedAt: '2024-01-05T10:00:00Z',
        url: 'https://www.youtube.com/watch?v=YZv8-6ZP1Gk'
      },
      {
        id: 'industrial-waste-segregation',
        title: 'Industrial Waste Segregation Best Practices',
        description: 'Comprehensive guide to waste segregation in industrial settings. Learn safety protocols and efficiency measures for large-scale waste management.',
        thumbnail: 'https://img.youtube.com/vi/IBRaAM1u_30/maxresdefault.jpg',
        channelTitle: 'Industrial Solutions',
        publishedAt: '2024-01-04T10:00:00Z',
        url: 'https://www.youtube.com/watch?v=IBRaAM1u_30'
      }
    ];
  };

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const goToNextPage = () => {
    if (nextPageToken) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      fetchVideos(nextPageToken);
    }
  };

  const goToPrevPage = () => {
    if (prevPageToken) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      fetchVideos(prevPageToken);
    }
  };

  return {
    videos,
    loading,
    error,
    nextPageToken,
    prevPageToken,
    goToNextPage,
    goToPrevPage
  };
}

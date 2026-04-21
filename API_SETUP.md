# API Configuration Guide

## Environment Setup

### Prerequisites
- **Windows**: Python 3.9+ with pip
- **Windows GPU (optional)**: CUDA 11.8+ and cuDNN for GPU acceleration
- **Alternative**: Use CPU-only TensorFlow (works on all platforms)

## Current API Setup

### 1. NewsAPI
- **Status**: Configured ✅
- **Purpose**: Fetch waste management and environmental news articles
- **Endpoint**: `https://newsapi.org/v2/everything`
- **Environment Variable**: `REACT_APP_NEWS_API_KEY`
- **Current Key**: `4c0a127652284f7b9ddc1ab8e5422023`
- **Usage**: Displays 12+ waste-related articles with categories
- **Features**:
  - Real-time news fetching
  - Automatic deduplication
  - Category detection
  - Read time estimation

### 2. YouTube Data API v3
- **Status**: Configured ✅
- **Purpose**: Fetch educational waste segregation videos
- **Endpoint**: `https://www.googleapis.com/youtube/v3/search`
- **Environment Variable**: `REACT_APP_YOUTUBE_API_KEY`
- **Current Key**: `AIzaSyDHJnglkxgIMmk1VUcfuTgSw5MXjbZ5yxc`
- **Usage**: Displays 12+ educational videos with filtering
- **Features**:
  - Category filtering (All, Tutorials, Benefits)
  - Pagination support
  - CORS proxy fallback
  - Fallback to hardcoded videos

## Environment Variables

The `.env` file should be in the `frontend/` directory with the following format:

```
REACT_APP_NEWS_API_KEY=your_newsapi_key_here
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key_here
```

**Important**: Do NOT include quotes or semicolons in the .env file.

## Getting API Keys

### NewsAPI
1. Go to: https://newsapi.org/
2. Click "Sign Up" (free tier available)
3. Get your API key from the dashboard
4. Add to `.env` as `REACT_APP_NEWS_API_KEY=your_key`

### YouTube API v3
1. Go to: https://console.cloud.google.com/
2. Create a new project
3. Enable "YouTube Data API v3"
4. Create an API key in Credentials
5. Add to `.env` as `REACT_APP_YOUTUBE_API_KEY=your_key`

## Testing APIs

### Test News API
Visit: `http://localhost:3000` and check the News tab

### Test YouTube API
Visit: `http://localhost:3000` and check the Videos tab

## API Errors & Solutions

### YouTube API Error: 400
- Possible causes:
  - Invalid or missing API key
  - API key not enabled for YouTube v3
  - CORS issues
- Solution: Check .env file and ensure API key is correct

### NewsAPI Error: Unable to fetch news
- Possible causes:
  - Invalid API key
  - Rate limit exceeded (free tier: 100 requests/day)
  - Network connectivity issues
- Solution: Check .env file and API quota

### CORS Issues
- The app has a fallback CORS proxy for YouTube
- Falls back to hardcoded video list if direct API fails

## Security Notes

- ✅ API keys are stored in `.env` file (not in source code)
- ✅ `.env` file is in `.gitignore` (not committed to git)
- ✅ Use `.env.example` as template for setup
- ⚠️ Never commit real API keys to version control
- ⚠️ Rotate keys if compromised

## Rate Limits

### NewsAPI Free Tier
- 100 requests per day
- Updates: Every 15 minutes

### YouTube API
- 10,000 quota units per day
- Each search query = 100 units
- Each video retrieval = 1 unit

## Deployment Notes

When deploying to production:
1. Set environment variables in hosting platform
2. Use production API keys (may have different quotas)
3. Consider implementing caching for API responses
4. Monitor API usage and costs

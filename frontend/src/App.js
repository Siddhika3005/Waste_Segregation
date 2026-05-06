/*
Smart Waste Segregation Application - Main React Component

This is the main application file that handles:
- User authentication (Login/Signup)
- Waste image classification
- Analytics dashboard
- News and educational content
- User account management

Components:
- LoginPage: User login and registration
- Dashboard: Main application interface
- WasteAnalyzer: Image upload and prediction
- Analytics: Waste classification statistics
- Resources: News and YouTube videos
*/

// ==================== IMPORTS ====================
import './App.css';  // Main stylesheet
import { useState, useEffect } from 'react';  // React hooks for state and effects
// Import UI icons from lucide-react library
import {
  Upload,  // Upload icon
  Leaf,  // Leaf icon (app logo)
  Trash2,  // Trash icon
  TrendingUp,  // Analytics icon
  Home,  // Home/dashboard icon
  BarChart3,  // Statistics icon
  CheckCircle2,  // Success/verified icon
  AlertCircle,  // Warning/alert icon
  Zap,  // Lightning icon
  LogOut,  // Logout icon
  Eye,  // Show password icon
  EyeOff,  // Hide password icon
  Newspaper,  // News icon
  ExternalLink,  // External link icon
  ChevronLeft,  // Left arrow icon
  ChevronRight,  // Right arrow icon
  PlayCircle  // Play button icon
} from 'lucide-react';
// Custom hooks for fetching data
import { useNews } from './useNews';  // Hook to fetch news articles
import { useYouTube } from './useYouTube';  // Hook to fetch YouTube videos

// ==================== API CONFIGURATION ====================
// Backend API URL - loads from environment variable or defaults to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// ==================== LOGIN PAGE COMPONENT ====================
/**
 * LoginPage - Handles user authentication
 * Features:
 * - Email and password login
 * - New user registration/signup
 * - Password visibility toggle
 * - Form validation
 *
 * Props:
 * - onLogin: Callback function when user logs in
 * - onSignup: Callback function when user signs up
 */
function LoginPage({ onLogin, onSignup }) {
  // ========== STATE VARIABLES ==========
  // Toggle between login and signup forms
  const [isLogin, setIsLogin] = useState(true);
  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  // ========== LOGIN FORM STATE ==========
  const [loginEmail, setLoginEmail] = useState('');  // Email input
  const [loginPassword, setLoginPassword] = useState('');  // Password input
  
  // ========== SIGNUP FORM STATE ==========
  const [signupName, setSignupName] = useState('');  // Full name input
  const [signupEmail, setSignupEmail] = useState('');  // Email input
  const [signupPassword, setSignupPassword] = useState('');  // Password input
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');  // Confirm password input

  // ========== LOGIN HANDLER ==========
  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission
    onLogin(loginEmail, loginPassword);  // Call parent callback with credentials
    // Clear form fields after submission
    setLoginEmail('');
    setLoginPassword('');
  };

  // ========== SIGNUP HANDLER ==========
  // Handle signup form submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission
    // Validate that passwords match
    if (signupPassword !== signupConfirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Call parent callback with signup details
    onSignup(signupName, signupEmail, signupPassword, signupConfirmPassword);
    // Clear form fields after submission
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="login-container">
        <div className="login-card glass">
          <div className="login-header">
            <div className="login-logo">
              <Leaf size={40} className="logo-icon" />
            </div>
            <h1>Smart Waste Segregation</h1>
            <p>Intelligence for a cleaner planet</p>
          </div>

          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="login-form">
              <h2>Welcome Back</h2>
              
              <div className="form-group">
                <label htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <div className="password-input-group">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary login-btn">
                <Zap size={18} /> Login
              </button>

              <div className="form-divider">or</div>

              <button
                type="button"
                className="toggle-form-btn"
                onClick={() => setIsLogin(false)}
              >
                Don't have an account? Sign Up
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="login-form">
              <h2>Create Account</h2>

              <div className="form-group">
                <label htmlFor="signup-name">Full Name</label>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-email">Email Address</label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <div className="password-input-group">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signup-confirm">Confirm Password</label>
                <input
                  id="signup-confirm"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary login-btn">
                <CheckCircle2 size={18} /> Sign Up
              </button>

              <div className="form-divider">or</div>

              <button
                type="button"
                className="toggle-form-btn"
                onClick={() => setIsLogin(true)}
              >
                Already have an account? Login
              </button>
            </form>
          )}


        </div>
      </div>
    </div>
  );
}

// Home News Section Component with Carousel
function HomeNewsSection() {
  const { articles, loading } = useNews();
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCategoryBadge = (source) => {
    const source_name = source.toLowerCase();
    if (source_name.includes('bbc') || source_name.includes('guardian')) {
      return 'environment';
    }
    if (source_name.includes('science') || source_name.includes('research')) {
      return 'research';
    }
    if (source_name.includes('tech') || source_name.includes('wired')) {
      return 'technology';
    }
    return 'innovation';
  };

  const displayArticles = articles.length > 0 ? articles : [];
  const totalSlides = Math.ceil(displayArticles.length / 2);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getDisplayArticles = () => {
    const startIdx = currentIndex * 2;
    return displayArticles.slice(startIdx, startIdx + 2);
  };

  return (
    <section className="news-section">
      <div className="section-header">
        <h2>Latest News</h2>
        <p>Stay informed about waste management innovations</p>
      </div>
      
      {loading ? (
        <div className="carousel-wrapper">
          <div className="carousel-container">
            <div className="news-container">
              <div className="news-card glass news-card-left" style={{ opacity: 0.6 }}>
                <div style={{ height: '20px', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', marginBottom: '1rem' }}></div>
                <div style={{ height: '16px', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', marginBottom: '0.5rem', width: '80%' }}></div>
                <div style={{ height: '12px', background: 'rgba(0,0,0,0.1)', borderRadius: '8px' }}></div>
              </div>
              <div className="news-card glass news-card-right" style={{ opacity: 0.6 }}>
                <div style={{ height: '20px', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', marginBottom: '1rem' }}></div>
                <div style={{ height: '16px', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', marginBottom: '0.5rem', width: '80%' }}></div>
                <div style={{ height: '12px', background: 'rgba(0,0,0,0.1)', borderRadius: '8px' }}></div>
              </div>
            </div>
          </div>
        </div>
      ) : displayArticles.length > 0 ? (
        <div className="carousel-wrapper">
          {totalSlides > 1 && (
            <button 
              className="carousel-button carousel-button-left glass"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} />
            </button>
          )}
          
          <div className="carousel-container">
            <div className="news-container carousel-content">
              {getDisplayArticles().map((article, idx) => (
                <a
                  key={idx}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`news-card glass ${idx === 0 ? 'news-card-left' : 'news-card-right'} news-link`}
                >
                  {article.urlToImage && (
                    <div className="news-card-image">
                      <img 
                        src={article.urlToImage} 
                        alt={article.title}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <span className={`news-badge ${getCategoryBadge(article.source.name)}`}>
                    {article.source.name}
                  </span>
                  <h3>{article.title}</h3>
                  <p>{article.description || 'Click to read full article'}</p>
                  <div className="news-footer">
                    <span className="news-date">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {totalSlides > 1 && (
            <button 
              className="carousel-button carousel-button-right glass"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight size={28} />
            </button>
          )}
          
          {totalSlides > 1 && (
            <div className="carousel-indicators-bottom">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="carousel-wrapper">
          <div className="carousel-container">
            <div className="news-container">
              <div className="news-card glass news-card-left">
                <span className="news-badge environment">Environment</span>
                <h3>Energy Consumption & Waste Reduction</h3>
                <p>New studies reveal that proper waste segregation at source can reduce landfill methane emissions by up to 40%.</p>
              </div>
              <div className="news-card glass news-card-right">
                <span className="news-badge research">Research</span>
                <h3>Recycling Impact on Soil Health</h3>
                <p>Composting biodegradable waste returns vital nutrients to the soil with increased organic production.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Good Habits Section Component
function GoodHabitsSection() {
  const { videos, loading } = useYouTube('waste segregation benefits environmental impact responsibility', 4);

  return (
    <section className="habits-section">
      <div className="section-header">
        <h2>Good Habits for Waste Segregation</h2>
        <p>Learn sustainable practices and master proper waste disposal techniques</p>
      </div>
      
      {loading ? (
        <div className="habits-grid">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="habit-card glass" style={{ opacity: 0.6 }}>
              <div className="habit-thumbnail" style={{ background: 'rgba(0,0,0,0.1)' }}></div>
              <div className="habit-content">
                <div style={{ height: '20px', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', marginBottom: '0.5rem' }}></div>
                <div style={{ height: '16px', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', width: '80%' }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="habits-grid">
          {videos.map((video, idx) => (
            <a
              key={idx}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="habit-card glass"
            >
              <div className="habit-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                <div className="play-overlay">
                  <PlayCircle size={48} color="white" />
                </div>
              </div>
              <div className="habit-content">
                <h3>{video.title}</h3>
                <p>{video.description.substring(0, 80)}...</p>
                <span className="habit-badge">Watch on YouTube</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

// Educational Videos Tab Component
function EducationalVideosTab() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('waste segregation biodegradable non-biodegradable');
  const { videos, loading, error, nextPageToken, prevPageToken, goToNextPage, goToPrevPage } = useYouTube(searchQuery, 12);

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(v => {
        const isTutorial = selectedCategory === 'tutorial';
        const isHabit = selectedCategory === 'habits';
        // Smart categorization based on keywords
        const title = v.title.toLowerCase();
        const desc = v.description.toLowerCase();
        const content = title + desc;
        
        const tutorialKeywords = ['guide', 'how to', 'tutorial', 'learn', 'step', 'proper', 'methods', 'techniques', 'identification'];
        const habitKeywords = ['habit', 'tip', 'benefit', 'habit', 'reduce', 'impact', 'awareness', 'responsibility', 'myth'];
        
        const isTutorialContent = tutorialKeywords.some(kw => content.includes(kw));
        const isHabitContent = habitKeywords.some(kw => content.includes(kw));
        
        if (isTutorial) return isTutorialContent;
        if (isHabit) return isHabitContent;
        return true;
      });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    // Update search query based on category for more relevant results
    if (category === 'habits') {
      setSearchQuery('waste segregation benefits habits responsibility reduce impact');
    } else if (category === 'tutorial') {
      setSearchQuery('waste segregation tutorial guide how to biodegradable non-biodegradable hazardous');
    } else {
      setSearchQuery('waste segregation biodegradable non-biodegradable');
    }
  };

  return (
    <div className="videos-tab-content">
      <div className="videos-header">
        <h2>Waste Segregation Educational Videos</h2>
        <p>Master proper waste segregation techniques and learn best practices for environmental responsibility</p>
      </div>

      <div className="videos-filters">
        <button
          className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('all')}
        >
          All Videos
        </button>
        <button
          className={`filter-btn ${selectedCategory === 'tutorial' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('tutorial')}
        >
          How-To Guides
        </button>
        <button
          className={`filter-btn ${selectedCategory === 'habits' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('habits')}
        >
          Benefits & Tips
        </button>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Fetching waste segregation videos...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <AlertCircle size={40} />
          <p>Failed to load videos: {error}</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Showing educational content from our waste management database
          </p>
        </div>
      )}

      {!loading && !error && videos.length > 0 && (
        <>
          <div className="videos-grid">
            {filteredVideos.map((video, idx) => (
              <a
                key={idx}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card glass"
              >
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="play-overlay">
                    <PlayCircle size={56} color="white" />
                  </div>
                  <span className="video-source-badge">YouTube</span>
                </div>
                <div className="video-content">
                  <h3>{video.title}</h3>
                  <p>{video.description.substring(0, 100)}...</p>
                  <div className="video-footer">
                    <span className="video-channel">{video.channelTitle}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Pagination Controls */}
          {(nextPageToken || prevPageToken) && (
            <div className="pagination-controls">
              <button
                className="pagination-btn glass"
                onClick={goToPrevPage}
                disabled={!prevPageToken}
              >
                <ChevronLeft size={20} /> Previous
              </button>
              
              <span className="pagination-info">
                Showing {filteredVideos.length} videos
              </span>
              
              <button
                className="pagination-btn glass"
                onClick={goToNextPage}
                disabled={!nextPageToken}
              >
                Next <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !error && videos.length === 0 && (
        <div className="empty-state">
          <PlayCircle size={48} />
          <p>No videos found for this category</p>
        </div>
      )}
    </div>
  );
}
function NewsTabContent({ setActiveTab }) {
  const { articles, loading, error } = useNews();

  const getCategoryBadge = (source) => {
    const source_name = source.toLowerCase();
    if (source_name.includes('bbc') || source_name.includes('guardian')) {
      return 'environment';
    }
    if (source_name.includes('science') || source_name.includes('research')) {
      return 'research';
    }
    if (source_name.includes('tech') || source_name.includes('wired')) {
      return 'technology';
    }
    return 'innovation';
  };

  const estimateReadTime = (description) => {
    if (!description) return '3';
    const words = description.split(' ').length;
    return Math.ceil(words / 200).toString();
  };

  return (
    <section className="news-tab-section">
      <div className="news-tab-container">
        <div className="news-tab-header">
          <button 
            className="back-btn"
            onClick={() => setActiveTab('home')}
            title="Back to Home"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className="header-content">
            <Newspaper size={40} className="news-icon" />
            <h1>Waste Management News</h1>
            <p>Latest updates on waste segregation, recycling innovations, and environmental sustainability</p>
          </div>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="spinner-large"></div>
            <p>Fetching latest news...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <AlertCircle size={32} />
            <p>Unable to fetch news at the moment. Please try again later.</p>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="news-articles-grid">
            {articles.map((article, idx) => (
              <a
                key={idx}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-article-card glass news-link"
              >
                {article.urlToImage && (
                  <div className="article-image">
                    <img 
                      src={article.urlToImage} 
                      alt={article.title}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <span className={`article-badge ${getCategoryBadge(article.source.name)}`}>
                  {article.source.name}
                </span>
                <h3>{article.title}</h3>
                <p>{article.description || 'Click to read full article'}</p>
                <div className="article-meta">
                  <span className="article-date">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="article-read-time">
                    {estimateReadTime(article.description)} min read
                  </span>
                  <ExternalLink size={14} />
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="empty-state">
            <Newspaper size={48} />
            <p>No articles found. Please try again later.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const cachedUser = localStorage.getItem('wasteUser');
    if (cachedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email, password) => {
    // Simple validation
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('wasteUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const userData = { email: user.email, name: user.name };
      localStorage.setItem('wasteUser', JSON.stringify(userData));
      setIsLoggedIn(true);
      setActiveTab('home');
    } else {
      alert('Invalid email or password');
    }
  };

  const handleSignup = (name, email, password, confirmPassword) => {
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('wasteUsers') || '[]');
    if (users.some(u => u.email === email)) {
      alert('User already exists with this email');
      return;
    }

    // Create new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('wasteUsers', JSON.stringify(users));

    // Auto login
    const userData = { email: newUser.email, name: newUser.name };
    localStorage.setItem('wasteUser', JSON.stringify(userData));
    setIsLoggedIn(true);
    setActiveTab('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('wasteUser');
    setIsLoggedIn(false);
    setUploadedImage(null);
    setAnalysisResult(null);
    setActiveTab('home');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeWaste = async () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    try {
      // Convert data URL to blob
      const byteString = atob(uploadedImage.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: 'image/jpeg' });
      
      // Create FormData
      const formData = new FormData();
      formData.append('file', blob, 'waste-image.jpg');
      
      // Call backend API
      const apiResponse = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error(`API Error: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      
      // Get the winning prediction from backend
      const prediction = data.prediction; // 'bio-degradable' or 'non-biodegradable'
      const confidence = data.confidence;
      
      const isBio = prediction === 'bio-degradable';
      
      const result = [
        {
          name: isBio ? 'Biodegradable' : 'Non-Biodegradable',
          percentage: Math.round(confidence * 100),
          trustRate: (confidence * 100).toFixed(1),
          items: isBio 
            ? ['Food waste', 'Paper', 'Plant material'] 
            : ['Plastic', 'Metal', 'Glass'],
          icon: isBio ? 'leaf' : 'trash'
        }
      ];
      
      setAnalysisResult(result);
      setIsAnalyzing(false);
    } catch (error) {
      console.error('Analysis error:', error);
      alert(`Analysis failed: ${error.message}\n\nMake sure the backend is running on ${API_URL}`);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} onSignup={handleSignup} />
      ) : (
        <>
          {/* Navigation Header */}
          <nav className="navbar">
            <div className="navbar-container">
              <div className="logo">
                <Leaf className="logo-icon" size={28} strokeWidth={2.5} />
                <span className="logo-text">Smart Waste Segregation System</span>
              </div>
              <div className="nav-icons">
                <button 
                  className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('home')}
                  title="Home"
                >
                  <Home size={20} />
                </button>
                <button 
                  className={`nav-btn ${activeTab === 'analyze' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('analyze')}
                  title="Analyze"
                >
                  <BarChart3 size={20} />
                </button>
                <button 
                  className={`nav-btn ${activeTab === 'news' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('news')}
                  title="News"
                >
                  <Newspaper size={20} />
                </button>
                <button 
                  className={`nav-btn ${activeTab === 'videos' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('videos')}
                  title="Videos"
                >
                  <PlayCircle size={20} />
                </button>
                <button 
                  className="nav-btn" 
                  title="Logout"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </nav>

      {/* Main Content */}
      <div className="main-container">
        
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <section className="hero-section">
              <div className="hero-content">
                <div className="badge glass">
                  <Zap size={16} className="badge-icon" />
                  Smart Waste Intelligence
                </div>
                <h1 className="hero-title">
                  Intelligence for a <span className="highlight">cleaner</span> planet
                </h1>
                <p className="hero-subtitle">
                  Classify waste instantly with AI. Separate biodegradable from non-biodegradable and make informed disposal decisions.
                </p>
                <div className="hero-buttons">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveTab('analyze')}
                  >
                    <Zap size={18} className="btn-icon" />
                    Analyze Waste
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setActiveTab('news')}
                  >
                    <TrendingUp size={18} className="btn-icon" />
                    Explore News
                  </button>
                </div>
              </div>
              <div className="hero-illustration">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
              </div>
            </section>

            {/* Latest Updates Section */}

            {/* News Section */}
            <HomeNewsSection />

            {/* Good Habits Section */}
            <GoodHabitsSection />

          </>
        )}

        {/* ANALYZE TAB */}
        {activeTab === 'analyze' && (
          <section className="analyze-section">
            <div className="analyze-container">
              <div className="analyze-header">
                <button 
                  className="back-btn"
                  onClick={() => setActiveTab('home')}
                  title="Back to Home"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
                <div className="header-content">
                  <BarChart3 size={40} className="analyze-icon" />
                  <h1>Waste Analysis</h1>
                  <p>Upload a photo of your waste to analyze and segregate it</p>
                </div>
              </div>

              <div className="analyze-content">
                {!uploadedImage ? (
                  <>
                    {/* Upload Modal Card */}
                    <div className="upload-modal glass">
                      <div className="modal-content">
                        {!uploadedImage ? (
                          <>
                            <Upload size={64} className="upload-icon" />
                            <h2>Upload Waste Photo</h2>
                            <p>Drag and drop your image here or click to browse</p>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="file-input"
                              id="waste-upload"
                            />
                            <label htmlFor="waste-upload" className="upload-label">
                              <Upload size={18} /> Choose File
                            </label>
                          </>
                        ) : (
                          <>
                            <img src={uploadedImage} alt="Uploaded waste" className="uploaded-image" />
                            <button 
                              className="btn btn-secondary change-image-btn"
                              onClick={() => document.getElementById('waste-upload').click()}
                            >
                              <Upload size={16} /> Change Image
                            </button>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="file-input"
                              id="waste-upload"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Uploaded Image Display */}
                    <div className="image-preview-modal glass">
                      <img src={uploadedImage} alt="Uploaded waste" className="uploaded-image-large" />
                      <button 
                        className="btn btn-secondary change-image-btn-modal"
                        onClick={() => document.getElementById('waste-upload').click()}
                      >
                        <Upload size={16} /> Change Image
                      </button>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input"
                        id="waste-upload"
                      />
                    </div>
                  </>
                )}

                {/* Analysis Results */}
                {analysisResult && (
                  <div className="results-container">
                    <h2 className="results-title">Analysis Results</h2>
                    <div className="waste-types">
                      {analysisResult.map((type, index) => (
                        <div key={index} className="waste-type-card glass">
                          <div className="type-header">
                            <div className="type-icon">
                              {type.icon === 'leaf' ? (
                                <Leaf size={32} className="leaf-icon" />
                              ) : (
                                <Trash2 size={32} className="trash-icon" />
                              )}
                            </div>
                            <div className="type-title">
                              <h3>{type.name}</h3>
                              <div className="percentage-bar">
                                <div 
                                  className={`percentage-fill ${type.icon === 'leaf' ? 'green' : 'red'}`}
                                  style={{ width: `${type.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <div className="type-stats">
                            <div className="stat">
                              <div className="stat-label">Composition</div>
                              <div className="stat-value">{type.percentage}%</div>
                            </div>
                            <div className="stat">
                              <div className="stat-label">Trust Rate</div>
                              <div className="stat-value trust-rate">
                                <CheckCircle2 size={16} />
                                {type.trustRate}%
                              </div>
                            </div>
                          </div>

                          <div className="type-items">
                            <p className="items-label">Detected Items:</p>
                            <div className="items-list">
                              {type.items.map((item, idx) => (
                                <span key={idx} className={`item-badge ${type.icon === 'leaf' ? 'biodegradable' : 'non-biodegradable'}`}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Action Buttons */}
              <div className="analyze-actions">
                {uploadedImage && !analysisResult && (
                  <button 
                    className="btn btn-primary analyze-btn"
                    onClick={analyzeWaste}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="spinner"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap size={18} /> Analyze Waste
                      </>
                    )}
                  </button>
                )}

                {analysisResult && (
                  <button 
                    className="btn btn-secondary analyze-again-btn"
                    onClick={() => {
                      setUploadedImage(null);
                      setAnalysisResult(null);
                    }}
                  >
                    <Upload size={18} /> Analyze Another Image
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* NEWS TAB */}
        {activeTab === 'news' && <NewsTabContent setActiveTab={setActiveTab} />}

        {/* VIDEOS TAB */}
        {activeTab === 'videos' && <EducationalVideosTab />}

        <footer className="footer glass">
          <div className="footer-container">
            <div className="footer-section">
              <div className="footer-logo">
                <Leaf size={28} className="footer-logo-icon" />
                <h3>Smart Waste Segregation</h3>
              </div>
              <p className="footer-description">
                Intelligent waste segregation system powered by AI for a cleaner, sustainable planet.
              </p>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><button onClick={() => setActiveTab('home')} className="footer-link-btn">Home</button></li>
                <li><button onClick={() => setActiveTab('analyze')} className="footer-link-btn">Analyze Waste</button></li>
                <li><button onClick={() => setActiveTab('videos')} className="footer-link-btn">Learn</button></li>
                <li><button onClick={() => setActiveTab('news')} className="footer-link-btn">News</button></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Features</h4>
              <ul className="footer-links">
                <li><a href="#analyze">AI Waste Analysis</a></li>
                <li><a href="#news">Latest Updates</a></li>
                <li><a href="#videos">Educational Videos</a></li>
                <li><a href="#impact">Global Impact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Resources</h4>
              <ul className="footer-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Connect</h4>
              <div className="footer-social">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>&copy; 2026 Smart Waste Segregation System. All rights reserved. | Made with <span style={{ color: '#ef4444' }}>♥</span> for a sustainable planet</p>
            </div>
          </div>
        </footer>
      </div>
        </>
      )}
    </div>
  );
}

export default App;

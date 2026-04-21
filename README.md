# 🌱 Smart Waste Segregation System

A modern, AI-powered web application for intelligent waste segregation and environmental impact tracking. This system uses advanced machine learning to classify waste materials and provides real-time insights into waste management with educational resources for sustainable living.

![Smart Waste Segregation](https://img.shields.io/badge/React-19.2.4-blue?logo=react)
![Status](https://img.shields.io/badge/Status-Active-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen)

---

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Usage](#-usage)
- [API Integration](#-api-integration)
- [Component Architecture](#-component-architecture)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 **Authentication System**
- User registration with password confirmation
- Secure login with email validation
- Persistent session management using localStorage
- Demo account: `demo@example.com` / `demo123`
- Password visibility toggle for better UX

### 🤖 **Waste Analysis Engine**
- Upload waste images for AI-powered classification
- Real-time waste segregation analysis
- Biodegradable vs Non-biodegradable detection
- Confidence score and trust rate indicators
- Detected items with detailed categorization
- Visual progress bars for composition analysis
- Mock ML model (ready for real backend integration)

### 📰 **Real-Time News Integration**
- NewsAPI integration for waste management news
- Dynamic news carousel on home page
- Dedicated news tab with 12+ articles per page
- Category detection (Environment, Research, Innovation, Technology)
- Read time estimation algorithm
- External links to source articles
- Responsive carousel with side navigation

### 🎓 **Educational Videos**
- YouTube API integration for waste-specific content
- 4 good habit videos on home page
- Dedicated videos tab with 12 videos per page
- Category filtering (All / Tutorials / Benefits)
- Fallback system with 12 hardcoded waste-related videos
- Previous/Next pagination controls
- Search query optimization for waste content

### 📊 **Live Statistics Dashboard**
- Real-time environmental metrics
- 2.4M+ Classifications tracked
- 98.6% Accuracy rate displayed
- 120K+ Tons CO₂ saved
- 85K+ Active users
- Interactive hover effects and animations

### 🎨 **Professional UI/UX**
- Glassmorphism design system
- Smooth animations and transitions
- Fully responsive design (Mobile, Tablet, Desktop)
- Advanced color gradients and hover effects
- Accessibility compliance
- Loading skeleton states
- Error handling and user feedback

### 👣 **Professional Footer**
- 5-column footer layout
- Brand information and description
- Quick navigation links
- Feature highlights
- Resource links
- Social media integration (Twitter, Facebook, Instagram, LinkedIn)
- Live statistics display in footer

---

## 🛠️ Technologies Used

### **Frontend Stack**
- **React** 19.2.4 - UI Framework
- **React Hooks** (useState, useEffect) - State Management
- **lucide-react** - Icon Library (20+ icons)
- **CSS3** - Advanced styling with glassmorphism

### **External APIs**
- **NewsAPI** - Real-time waste management news
- **YouTube Data API v3** - Educational video content
- **CORS Proxy** - API request handling

### **Build & Development**
- **Create React App** - Project scaffolding
- **npm** - Package management
- **Webpack** - Module bundling

### **Styling Features**
- Backdrop filters (blur effects)
- Linear and radial gradients
- CSS Grid and Flexbox layouts
- Responsive design patterns
- Keyframe animations
- Box shadows and inset shadows

---

## 📁 Project Structure

```
Waste_Segregation/
├── frontend/
│   ├── public/
│   │   ├── index.html           # Main HTML file
│   │   ├── favicon.svg          # Custom favicon
│   │   ├── logo192.svg          # Logo (192x192)
│   │   ├── logo512.svg          # Logo (512x512)
│   │   ├── manifest.json        # PWA manifest
│   │   └── robots.txt           # SEO robots file
│   ├── src/
│   │   ├── App.js               # Main application (~1212 lines)
│   │   ├── App.css              # Global styles (~2727 lines)
│   │   ├── useNews.js           # NewsAPI hook (~80 lines)
│   │   ├── useYouTube.js        # YouTube API hook (~130 lines)
│   │   ├── index.js             # React entry point
│   │   ├── index.css            # Global CSS
│   │   └── setupTests.js        # Test configuration
│   ├── package.json             # Dependencies
│   └── README.md                # Frontend documentation
├── README.md                    # Main project README
└── .gitignore                   # Git ignore rules

```

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- npm (v6 or higher)
- Web browser with modern JavaScript support
- Python 3.9+ (for backend ML model training)

### **Windows-Specific Setup**

If you're on Windows, follow these additional steps:

1. **Install Python** (if not already installed)
   - Download from: https://www.python.org/downloads/
   - Ensure "Add Python to PATH" is checked during installation

2. **Install TensorFlow for Windows**
   ```bash
   pip install tensorflow==2.16.1
   ```

3. **Backend Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Optional: GPU Support (CUDA)**
   - For faster model training, install CUDA 11.8+ and cuDNN
   - TensorFlow will automatically detect and use GPU if available

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/Siddhika3005/Waste_Segregation.git
cd Waste_Segregation
```

### **Step 2: Navigate to Frontend Directory (Windows)**
```bash
# Windows Command Prompt or PowerShell
cd frontend
```

### **Step 2: Navigate to Frontend Directory (macOS/Linux)**
```bash
cd frontend
```

### **Step 3: Install Dependencies**
```bash
npm install
```

### **Step 4: Configure Environment Variables**

Create a `.env` file in the `frontend` directory with your API keys:

```bash
REACT_APP_NEWS_API_KEY=your_newsapi_key_here
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key_here
```

Get your API keys from:
- [NewsAPI.org](https://newsapi.org/) - Sign up for a free API key
- [Google Cloud Console](https://console.cloud.google.com/) - Create a YouTube Data API v3 key

**Note:** Never commit your `.env` file to version control. Add it to `.gitignore`.

### **Step 5: Start the Development Server**
```bash
npm start
```

The app will open automatically at `http://localhost:3000`

---

## 📖 Usage

### **1. Authentication**
- Click "Sign Up" to create a new account
- Or use demo credentials:
  - Email: `demo@example.com`
  - Password: `demo123`

### **2. Analyze Waste**
1. Navigate to the "Analyze" tab
2. Click "Choose File" to upload a waste image
3. Click "Analyze Waste" button
4. View detailed results with composition percentages
5. See detected items categorized by type

### **3. View Educational Content**
- **Home Page**: See 4 featured good habit videos
- **Videos Tab**: Browse 12+ waste-related educational videos
- Filter by category: All, Tutorials, or Benefits
- Use Previous/Next buttons for pagination

### **4. Stay Updated**
- **Home Page**: View latest waste management news in carousel
- **News Tab**: Read 12+ articles with external links
- Articles auto-categorize by topic
- Estimated read time for each article

### **5. Track Impact**
- View live statistics on home page
- Monitor classifications, accuracy, CO₂ savings
- See active user count and environmental metrics

---

## 🔌 API Integration

### **NewsAPI**
- **Endpoint**: `https://newsapi.org/v2/everything`
- **Method**: GET
- **Queries**: Waste segregation, environmental impact, recycling news
- **Max Results**: 12 articles per request
- **Deduplication**: Removes duplicate articles by title
- **Error Handling**: Graceful fallback with console logging

### **YouTube Data API v3**
- **Endpoint**: `https://www.googleapis.com/youtube/v3/search`
- **Method**: GET
- **Search Categories**: All, Tutorials, Benefits (waste-specific)
- **CORS Handling**: Direct API + CORS proxy fallback
- **Fallback**: 12 hardcoded waste-related videos
- **Pagination**: Support for nextPageToken/prevPageToken

### **CORS Proxy**
```javascript
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// Used when direct API calls fail due to CORS restrictions
```

---

## 🏗️ Component Architecture

### **Main Components**

#### **LoginPage**
```javascript
// Handles user authentication
Props: onLogin, onSignup
State: email, password, signup form
Features: Password visibility toggle, form validation
```

#### **GoodHabitsSection**
```javascript
// Displays featured waste-related videos
Props: None
State: videos (from useYouTube hook)
Features: 4 featured videos, loading skeleton, hover effects
```

#### **EducationalVideosTab**
```javascript
// Full video library with filtering
Props: None
State: videos, category filter, current page
Features: Category filtering, pagination, search optimization
```

#### **NewsTabContent**
```javascript
// Dedicated news page with articles
Props: setActiveTab
State: articles (from useNews hook)
Features: 12 articles per page, categorization, external links
```

#### **HomeNewsSection**
```javascript
// News carousel on home page
Props: None
State: articles, carousel position
Features: 2 articles visible, side navigation buttons
```

#### **Analyze Section**
```javascript
// Waste analysis interface
Props: None
State: uploadedImage, analysisResult, isAnalyzing
Features: Image upload, mock ML analysis, detailed results
```

---

## 🎨 Design System

### **Color Palette**
```css
--primary-color: #22c55e (Green)
--primary-light: #86efac (Light Green)
--secondary-color: #10b981 (Teal)
--text-primary: #1f2937 (Dark Gray)
--text-secondary: #6b7280 (Medium Gray)
--background: #f3f4f6 (Light Gray)
```

### **Typography**
- **Headings**: 700-800 font-weight
- **Body Text**: 400-500 font-weight
- **Secondary Text**: 500-600 font-weight
- **Font Stack**: System fonts with sans-serif fallback

### **Effects**
- **Glassmorphism**: blur(20-25px), rgba backgrounds
- **Shadows**: Multiple layers for depth
- **Animations**: Smooth cubic-bezier transitions
- **Hover Effects**: Scale, translate, shadow enhancement

---

## 📸 Screenshots

### **Home Page**
- Hero section with gradient background
- Live statistics dashboard (4 columns)
- Good habits videos carousel (4 videos)
- News carousel (2 articles visible)
- Professional footer with 5 columns

### **Waste Analysis Page**
- Upload modal with floating animation
- Image preview with enhanced shadows
- Results container with slide-in animation
- Waste type cards with detailed metrics
- Progress bars with shimmer effect
- Item badges with hover effects

### **News Tab**
- 12+ articles in responsive grid
- Article cards with images
- Category badges
- Read time estimation
- External links with ExternalLink icon

### **Videos Tab**
- 12 videos per page
- Category filtering controls
- Video thumbnails with play overlay
- Pagination controls
- Responsive grid layout

---

## 🔮 Future Enhancements

### **Short Term (Priority)**
- [ ] Real ML model for waste classification (replace mock)
- [ ] User profile page with settings
- [ ] Analysis history tracking with database
- [ ] User statistics dashboard with charts
- [ ] Advanced video/news filtering and search

### **Medium Term**
- [ ] Backend API development (Node.js/Python)
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Share results on social media
- [ ] Push notifications for waste tips
- [ ] Waste segregation guidelines by location

### **Long Term**
- [ ] Mobile app (React Native)
- [ ] AR/VR waste identification
- [ ] Community challenges and leaderboards
- [ ] Integration with waste collection services
- [ ] Blockchain-based impact verification
- [ ] Multi-language support

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Project Owner

**Siddhika Singh**
- GitHub: [@Siddhika3005](https://github.com/Siddhika3005)
- Repository: [Waste_Segregation](https://github.com/Siddhika3005/Waste_Segregation)

---

## 📞 Support

For support, email us at support@smartwaste.com or open an issue on GitHub.

---

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Lucide React** for beautiful icons
- **NewsAPI** for real-time news data
- **YouTube API** for video content
- **Community Contributors** for feedback and support

---

## 📈 Project Stats

- **Total Lines of Code**: ~3,900+
- **React Components**: 6 main components
- **CSS Classes**: 100+ custom classes
- **API Integrations**: 2 (NewsAPI, YouTube)
- **Icons Used**: 20+
- **Responsive Breakpoints**: 3 (480px, 768px, 1024px+)
- **Animation Keyframes**: 5+

---

## 🔄 Version History

### **v1.0.0** (March 16, 2026)
- Initial release with full project setup
- React 19.2.4 frontend implementation
- Full UI implementation with glassmorphism design
- NewsAPI integration for waste management news
- YouTube API integration for educational videos
- Authentication system with persistent sessions
- Waste analysis mock engine
- Professional footer with social media links
- Responsive design across all devices

---

## 🌍 Environment

- **Development Server**: http://localhost:3000
- **Build Command**: `npm run build`
- **Test Command**: `npm test`
- **Browser Support**: Chrome, Firefox, Safari, Edge (latest versions)

---

**Made with ❤️ for a cleaner planet** 🌱
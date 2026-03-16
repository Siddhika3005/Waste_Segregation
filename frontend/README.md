# 🌱 Smart Waste Segregation - Frontend

A modern React 19.2.4 application featuring advanced waste segregation analysis with AI-powered classification, real-time news integration, and educational video content.

---

## 📋 Quick Links

- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Key Features](#-key-features)
- [Component Guide](#-component-guide)
- [Styling System](#-styling-system)
- [API Configuration](#-api-configuration)
- [Deployment](#-deployment)

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js v14+
- npm v6+
- Modern web browser

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/Siddhika3005/Waste_Segregation.git
cd Waste_Segregation/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The app will automatically open at `http://localhost:3000`

---

## 📜 Available Scripts

### **Development Mode**
```bash
npm start
```
- Runs the app in development mode
- Opens http://localhost:3000 in your browser
- Hot reloads on file changes
- Shows lint errors in console

### **Testing**
```bash
npm test
```
- Launches test runner in interactive watch mode
- Runs tests for all modified files

### **Build for Production**
```bash
npm run build
```
- Builds the app for production
- Minifies and optimizes all assets
- Output in `build/` folder
- Ready for deployment

### **Eject Configuration**
```bash
npm run eject
```
- Exposes all build configurations
- ⚠️ **Warning**: This is irreversible!

---

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html              # Main HTML file
│   ├── favicon.svg             # Custom favicon
│   ├── logo.svg                # Brand logo
│   ├── logo192.svg             # PWA icon (192x192)
│   ├── logo512.svg             # PWA icon (512x512)
│   ├── manifest.json           # PWA manifest
│   └── robots.txt              # SEO robots file
├── src/
│   ├── App.js                  # Main app component (~1212 lines)
│   ├── App.css                 # Global styles (~2727 lines)
│   ├── App.test.js             # App tests
│   ├── useNews.js              # NewsAPI custom hook (~80 lines)
│   ├── useYouTube.js           # YouTube API custom hook (~130 lines)
│   ├── index.js                # React entry point
│   ├── index.css               # Global CSS utilities
│   ├── reportWebVitals.js      # Performance metrics
│   └── setupTests.js           # Test setup configuration
├── package.json                # Dependencies & scripts
├── package-lock.json           # Locked dependency versions
└── README.md                   # This file
```

---

## ✨ Key Features

### **🔐 Authentication**
- Email/password based login
- User signup with validation
- localStorage persistence
- Demo account support
- Password visibility toggle

### **🤖 Waste Analysis**
- Image upload interface
- AI-powered waste classification
- Biodegradable detection
- Non-biodegradable classification
- Confidence scoring
- Visual progress bars
- Item categorization

### **📰 News Integration**
- Real-time waste management news
- NewsAPI integration
- News carousel (home page)
- Dedicated news tab
- Read time estimation
- Category detection
- External article links

### **🎓 Educational Videos**
- YouTube API integration
- Good habits section (home page)
- Dedicated videos tab
- Category filtering
- Pagination controls
- Fallback video system
- Search optimization

### **📊 Statistics Dashboard**
- Live metrics display
- Classifications count
- Accuracy percentage
- CO₂ savings tracker
- User count
- Animated counters
- Responsive grid layout

### **🎨 Design**
- Glassmorphism UI
- Smooth animations
- Responsive layout
- Professional color scheme
- Accessible components
- Loading states
- Error handling

---

## 🏗️ Component Guide

### **App.js** (~1212 lines)

**Main Components:**

1. **LoginPage**
   - Authentication interface
   - Signup form with validation
   - Password toggle visibility
   - Demo credentials support

2. **GoodHabitsSection**
   - 4 featured waste videos
   - YouTube API integration
   - Loading skeleton states
   - Responsive grid layout

3. **EducationalVideosTab**
   - 12 videos per page
   - Category filtering
   - Pagination controls
   - Search query optimization

4. **NewsTabContent**
   - News article display
   - 12 articles per page
   - Category badges
   - Read time estimation

5. **HomeNewsSection**
   - News carousel
   - 2 articles visible
   - Side navigation buttons
   - Responsive design

6. **Analyze Section**
   - Image upload modal
   - Preview display
   - Analysis results
   - Waste classification
   - Item categorization

7. **Footer**
   - 5-column layout
   - Brand information
   - Navigation links
   - Social media
   - Live statistics

### **useNews.js** (~80 lines)
Custom hook for NewsAPI integration
```javascript
const { articles, loading, error } = useNews();
```
- Fetches waste-related news
- Deduplicates articles
- Max 12 results
- Error handling

### **useYouTube.js** (~130 lines)
Custom hook for YouTube Data API v3
```javascript
const { videos, loading } = useYouTube(query, maxResults);
```
- Dynamic video search
- CORS handling with fallback
- 12 hardcoded backup videos
- Pagination support
- Category filtering

---

## 🎨 Styling System

### **CSS Architecture**
- **Total**: ~2727 lines of CSS
- **Approach**: Utility + Component-scoped
- **Preprocessor**: None (pure CSS3)
- **Variables**: CSS custom properties

### **Design Tokens**

**Colors**
```css
--primary-color: #22c55e       /* Green */
--primary-light: #86efac       /* Light Green */
--secondary-color: #10b981     /* Teal */
--text-primary: #1f2937        /* Dark Gray */
--text-secondary: #6b7280      /* Medium Gray */
--background: #f3f4f6          /* Light Gray */
```

**Effects**
```css
/* Glassmorphism Base */
.glass {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20-25px);
  -webkit-backdrop-filter: blur(20-25px);
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 12px 48px rgba(31, 38, 135, 0.1);
}
```

### **Responsive Breakpoints**
```css
/* Mobile */
@media (max-width: 480px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

### **Animations**
- `float` - Icon floating effect
- `spin` - Loading spinner
- `shimmer` - Progress bar shimmer
- `slideIn` - Results container animation
- Smooth cubic-bezier transitions

---

## 🔌 API Configuration

### **NewsAPI Setup**

**File**: `useNews.js`

```javascript
const API_KEY = '4c0a127652284f7b9ddc1ab8e5422023';
const newsApi = `https://newsapi.org/v2/everything?...`;
```

**Configuration:**
- 3 waste-related search queries
- Max 12 articles per request
- Title deduplication
- Error handling with fallback

### **YouTube API Setup**

**File**: `useYouTube.js`

```javascript
const YOUTUBE_API_KEY = 'AIzaSyDHJnglkxgIMmk1VUcfuTgSw5MXjbZ5yxc';
const youtubeApi = `https://www.googleapis.com/youtube/v3/search?...`;
```

**Configuration:**
- Dynamic search queries
- CORS proxy fallback
- 12 hardcoded fallback videos
- Pagination support
- Category-based filtering

### **Environment Variables** (Optional)

Create `.env` file:
```bash
REACT_APP_NEWS_API_KEY=your_key_here
REACT_APP_YOUTUBE_API_KEY=your_key_here
```

---

## 🔐 Authentication

### **Demo Account**
```
Email: demo@example.com
Password: demo123
```

### **Storage**
```javascript
// localStorage structure
localStorage.wasteUsers = [
  { name, email, password, createdAt }
]

localStorage.wasteUser = {
  name, email, isLoggedIn
}
```

### **Session Management**
- Persistent login on page refresh
- Logout clears session
- Password stored in localStorage (development only)

---

## 📦 Dependencies

### **Core**
```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4"
}
```

### **Icons**
```json
{
  "lucide-react": "^latest"
}
```

### **Available Icons** (20+)
Upload, Leaf, Trash2, TrendingUp, Home, BarChart3, CheckCircle2, AlertCircle, Zap, LogOut, Eye, EyeOff, Newspaper, ExternalLink, ChevronLeft, ChevronRight, PlayCircle

### **Dev Dependencies**
```json
{
  "@testing-library/react": "^latest",
  "@testing-library/jest-dom": "^latest",
  "react-scripts": "^latest"
}
```

---

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Deployment Options**

**1. Vercel (Recommended)**
```bash
npm i -g vercel
vercel
```

**2. Netlify**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=build
```

**3. GitHub Pages**
```bash
# Add to package.json
"homepage": "https://username.github.io/Waste_Segregation"

npm run build
# Push build folder to gh-pages branch
```

**4. Docker**
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🧪 Testing

### **Run Tests**
```bash
npm test
```

### **Test Coverage**
```bash
npm test -- --coverage
```

### **Test Files**
- `App.test.js` - Main app tests
- `useNews.test.js` - News hook tests (optional)
- `useYouTube.test.js` - YouTube hook tests (optional)

---

## 🐛 Troubleshooting

### **Issue: API 403 Forbidden**
**Solution**: Use CORS proxy fallback
```javascript
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
```

### **Issue: Images not loading**
**Solution**: Check public folder path
```html
<img src="%PUBLIC_URL%/logo.svg" />
```

### **Issue: Hot reload not working**
**Solution**: Clear cache and restart
```bash
npm start
# Press Ctrl+C and run again
```

---

## 📋 Checklist for Development

- [ ] Clone repository
- [ ] Install dependencies: `npm install`
- [ ] Configure API keys in hooks
- [ ] Start dev server: `npm start`
- [ ] Test authentication
- [ ] Test waste analysis
- [ ] Check news feed
- [ ] Verify videos
- [ ] Test responsive design
- [ ] Build for production: `npm run build`

---

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git add .
git commit -m 'Add amazing feature'

# Push to remote
git push origin feature/amazing-feature

# Create Pull Request on GitHub
```

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Create React App Docs](https://create-react-app.dev)
- [CSS Tricks - Glassmorphism](https://css-tricks.com)
- [Responsive Design](https://web.dev/responsive-web-design-basics/)

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and open a Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 📞 Support

- 📧 Email: support@smartwaste.com
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

**Made with ❤️ for a cleaner planet** 🌱

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

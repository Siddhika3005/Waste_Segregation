# Smart Waste Segregation System - Setup Guide

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git (optional)

## 🚀 Installation & Running

### 1. Navigate to Frontend Directory
```bash
cd /Users/suryanshagarwal/Waste_Segregation/frontend
```

### 2. Install Dependencies (if not already done)
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

## 📂 Project Structure

```
frontend/
├── src/
│   ├── App.js                 # Main component with Home & Analyze pages
│   ├── App.css                # All styling (glassmorphism design)
│   ├── index.js               # React entry point
│   ├── reportWebVitals.js     # Performance monitoring
│   └── setupTests.js          # Test configuration
├── public/
│   ├── index.html             # HTML template
│   ├── manifest.json          # PWA manifest
│   └── robots.txt             # SEO robots file
├── package.json               # Dependencies & scripts
└── FEATURES.md                # Feature documentation
```

## 🎯 Usage

### Home Page
- Click the Home icon in the navbar to view the homepage
- Shows news, updates, and global impact statistics
- Click "Analyze Waste" button to navigate to analysis page

### Analyze Waste
- Click the Analyze icon in the navbar or button to upload images
- Upload waste photos using the file picker
- Click "Analyze Now" to simulate AI classification
- Results show:
  - Biodegradable percentage and items
  - Non-biodegradable percentage and items
  - Trust rates for each category
- Upload another image to analyze again

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject configuration (WARNING: irreversible)
npm eject
```

## 🎨 Customization

### Colors
Edit CSS variables in `App.css`:
```css
:root {
  --primary-color: #22c55e;     /* Change green shade */
  --secondary-color: #10b981;   /* Change emerald shade */
  --dark-bg: #0f172a;           /* Background color */
  /* ... more colors */
}
```

### Fonts
Modify font-family in `.App` class in `App.css`

### Spacing & Sizing
Adjust padding, margins, and dimensions in relevant CSS classes

## 📱 Responsive Design

The app is fully responsive:
- **Mobile**: Optimized touch interface
- **Tablet**: Two-column layouts
- **Desktop**: Full multi-column experience

Test using browser DevTools (F12) → Device Toolbar

## 🔌 Integration Notes

The waste analysis currently simulates AI results. To integrate real AI:

1. Create a backend API endpoint
2. Update `analyzeWaste()` in `App.js`
3. Send image data to your backend
4. Receive classification results
5. Display results in the UI

Example integration point:
```javascript
const analyzeWaste = async () => {
  if (!uploadedImage) return;
  
  setIsAnalyzing(true);
  
  // Call your backend API
  const formData = new FormData();
  formData.append('image', uploadedImage);
  
  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: formData
  });
  
  const results = await response.json();
  setAnalysisResult(results);
  setIsAnalyzing(false);
};
```

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
npm start
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Build Fails
Ensure all files are saved and no syntax errors:
```bash
npm run build
```

## 📞 Support

For issues or features, check:
- React documentation: https://react.dev
- lucide-react icons: https://lucide.dev
- Browser console (F12) for errors

## 📝 Notes

- This is a frontend-only implementation
- AI analysis is simulated with 2-second delay
- No data persistence (local storage not implemented)
- All styling is CSS (no external CSS framework)
- Uses modern React hooks (functional components)

---
**Last Updated**: March 15, 2026
**Version**: 1.0.0

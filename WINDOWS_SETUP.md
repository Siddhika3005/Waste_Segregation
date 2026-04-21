# 🪟 Smart Waste Segregation - Windows Setup Guide

Complete step-by-step guide for setting up the project on Windows.

## Prerequisites

Before starting, ensure you have the following installed:

1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Python** (v3.9 or higher)
   - Download: https://www.python.org/downloads/
   - **⚠️ IMPORTANT**: Check "Add Python to PATH" during installation
   - Verify installation:
     ```bash
     python --version
     pip --version
     ```

3. **Git** (optional, for cloning repository)
   - Download: https://git-scm.com/download/win

4. **Visual C++ Build Tools** (may be needed for some Python packages)
   - Download: https://visualstudio.microsoft.com/downloads/
   - Select "Desktop development with C++"

## Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd Waste_Segregation\frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required npm packages listed in `package.json`.

### Step 3: Configure Environment Variables

Create a `.env` file in the `frontend` directory with your API keys:

```
REACT_APP_NEWS_API_KEY=your_newsapi_key_here
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key_here
```

#### Getting API Keys:

**NewsAPI Key:**
1. Go to https://newsapi.org/
2. Click "Sign Up" (free tier available)
3. Copy your API key from the dashboard
4. Add it to `.env`

**YouTube API Key:**
1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable "YouTube Data API v3"
4. Go to "Credentials" → Create "API Key"
5. Copy and add it to `.env`

### Step 4: Start Development Server

```bash
npm start
```

The application will automatically open at `http://localhost:3000`

---

## Backend Setup (Optional - for Model Training)

### Step 1: Navigate to Backend Directory

```bash
cd Waste_Segregation\backend
```

### Step 2: Create Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate
```

You should see `(venv)` in your terminal after activation.

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Train Model (Optional)

To train the waste segregation model:

1. Ensure dataset structure:
   ```
   backend/
   └── dataset/
       ├── bio-degradable/
       │   └── [waste images]
       └── non-biodegradable/
           └── [waste images]
   ```

2. Open `train_model.ipynb` in Jupyter or VS Code
3. Run all cells to train the model

```bash
# Install Jupyter if needed
pip install jupyter

# Start Jupyter
jupyter notebook
```

### Step 5: Run API Server

Once model training is complete:

```bash
python -m uvicorn api:app --host 0.0.0.0 --port 8080 --reload
```

The API will be available at `http://localhost:8080`

---

## GPU Support (Optional)

For faster model training on Windows with NVIDIA GPU:

### Step 1: Install CUDA Toolkit

1. Download CUDA 11.8: https://developer.nvidia.com/cuda-11-8-0-download-archive
2. Run installer and follow prompts
3. Verify installation:
   ```bash
   nvidia-smi
   ```

### Step 2: Install cuDNN

1. Download cuDNN: https://developer.nvidia.com/cudnn
2. Extract files to CUDA installation directory
   - Typically: `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8\`

### Step 3: Verify GPU Detection

```bash
python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"
```

If GPU is detected, training will automatically use it.

---

## Troubleshooting

### Issue: Python not found
**Solution:**
- Ensure Python is added to PATH
- Try using `python` instead of `python3`
- Restart terminal after installation

### Issue: npm packages installation fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rmdir /s /q node_modules
del package-lock.json

# Reinstall
npm install
```

### Issue: Port already in use
**Solution:**
```bash
# For port 3000 (React)
npx kill-port 3000

# For port 8080 (FastAPI)
npx kill-port 8080
```

### Issue: TensorFlow GPU not detected
**Solution:**
- Ensure CUDA and cuDNN are properly installed
- Check NVIDIA driver: `nvidia-smi`
- Reinstall TensorFlow:
  ```bash
  pip uninstall tensorflow
  pip install tensorflow-gpu==2.16.1
  ```

### Issue: Model file not found
**Solution:**
- Ensure `waste_model.h5` is in `backend/` directory
- Run training if model doesn't exist:
  ```bash
  cd backend
  jupyter notebook train_model.ipynb
  ```

---

## Development Commands

### Frontend Commands

```bash
cd frontend

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (WARNING: irreversible)
npm eject
```

### Backend Commands

```bash
cd backend

# Activate virtual environment
venv\Scripts\activate

# Run API server
python -m uvicorn api:app --reload

# Convert model to TFLite
python convert_to_tflite.py

# Deactivate virtual environment
deactivate
```

---

## Common Windows-Specific Issues

### Terminal Compatibility
- Use **PowerShell**, **Command Prompt**, or **Git Bash**
- Syntax differences:
  - PowerShell/CMD: `cd Waste_Segregation\frontend`
  - Git Bash: `cd Waste_Segregation/frontend`

### Path Separators
- Python automatically handles `/` and `\`
- For bash-style commands, use `/`
- For Windows cmd-style commands, use `\`

### Virtual Environment Activation
- **PowerShell:** `venv\Scripts\Activate.ps1`
- **Command Prompt:** `venv\Scripts\activate.bat`
- **Git Bash:** `source venv/Scripts/activate`

---

## Project Structure

```
Waste_Segregation/
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── App.js             # Main component
│   │   ├── App.css            # Styling
│   │   ├── useNews.js         # News API hook
│   │   ├── useYouTube.js      # YouTube API hook
│   │   └── index.js           # Entry point
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── package.json           # Dependencies
│   └── .env                   # API keys (create this)
│
├── backend/                    # Python backend (ML)
│   ├── api.py                 # FastAPI server
│   ├── train_model.ipynb      # Model training notebook
│   ├── convert_to_tflite.py   # Model conversion
│   ├── requirements.txt        # Python dependencies
│   ├── dataset/               # Training data
│   └── waste_model.h5         # Trained model (generated)
│
├── README.md                  # Main documentation
├── WINDOWS_SETUP.md          # This file
└── API_SETUP.md              # API configuration guide
```

---

## Next Steps

1. ✅ Follow this setup guide
2. ✅ Start frontend: `npm start`
3. ✅ Open http://localhost:3000
4. ✅ Test with demo credentials:
   - Email: `demo@example.com`
   - Password: `demo123`
5. ✅ (Optional) Train your own model with custom dataset

---

## Additional Resources

- [React Documentation](https://react.dev/)
- [TensorFlow for Python](https://www.tensorflow.org/install/pip)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

## Support

If you encounter any issues:

1. Check the **Troubleshooting** section above
2. Verify all prerequisites are installed
3. Ensure `.env` file is configured correctly
4. Check terminal output for error messages
5. Try restarting terminal and running commands again

---

Last Updated: 2026-04-16

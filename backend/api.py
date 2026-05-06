"""
Waste Segregation API - FastAPI Backend Server

This module provides a RESTful API for waste classification using a deep learning model.
It handles image uploads, preprocessing, and prediction of waste type (biodegradable vs non-biodegradable).

Endpoints:
- GET /health: Health check to verify API and model status
- POST /predict: Upload an image to classify waste type
"""

# ==================== IMPORTS ====================
from fastapi import FastAPI, UploadFile, File, HTTPException  # Web framework and file handling
from fastapi.middleware.cors import CORSMiddleware  # Cross-Origin Resource Sharing
import numpy as np  # Numerical computations
from PIL import Image  # Image processing
import tensorflow as tf  # Deep learning framework
import uvicorn  # ASGI server
from tensorflow.keras.applications.efficientnet import preprocess_input  # EfficientNet preprocessing
import os  # OS operations
import platform  # Platform information
from dotenv import load_dotenv  # Load environment variables
import io  # Byte stream handling

# ==================== CONFIGURATION ====================
# Load environment variables from .env file (allows configuration without changing code)
load_dotenv()

# Print system information for debugging
print(f"Running on: {platform.system()}")
print(f"Available GPUs: {tf.config.list_physical_devices('GPU')}")

# ==================== ENVIRONMENT VARIABLES ====================
# These can be overridden in .env file for custom configuration
API_HOST = os.getenv("API_HOST", "0.0.0.0")  # API server host (0.0.0.0 = accessible from any IP)
API_PORT = int(os.getenv("API_PORT", "8080"))  # API server port
IMG_SIZE = int(os.getenv("IMG_SIZE", "224"))  # Input image size for the model (224x224)
MODEL_PATH = os.getenv("MODEL_PATH", "waste_model.h5")  # Path to the trained model file
DEBUG = os.getenv("DEBUG", "false").lower() == "true"  # Debug mode flag
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", "10485760"))  # Maximum upload file size (10MB default)

# ==================== MODEL PATH SETUP ====================
# Get the absolute path to the model file (cross-platform compatible - works on Windows, Linux, macOS)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Directory where this script is located
FULL_MODEL_PATH = os.path.join(BASE_DIR, MODEL_PATH)  # Full path to the model

# ==================== MODEL LOADING ====================
# Load the pre-trained waste classification model
try:
    model = tf.keras.models.load_model(FULL_MODEL_PATH)
    print(f"✓ Model loaded successfully from {FULL_MODEL_PATH}")
except FileNotFoundError:
    print(f"✗ Error: Model file not found at {FULL_MODEL_PATH}")
    print("Please ensure 'waste_model.h5' is in the backend directory")
    raise

# Class names for prediction output (model has 2 output neurons for binary classification)
CLASS_NAMES = ["bio-degradable", "non-biodegradable"]

# ==================== FASTAPI APPLICATION ====================
# Create FastAPI application instance
app = FastAPI(
    title="Smart Waste Segregation API",
    description="AI-powered waste classification system using deep learning",
    version="1.0.0"
)

# ==================== CORS MIDDLEWARE ====================
# Enable Cross-Origin Resource Sharing to allow requests from frontend applications
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# ==================== HELPER FUNCTIONS ====================
def preprocess(image):
    """
    Preprocess an image for model prediction.
    
    Steps:
    1. Resize image to model input size (224x224)
    2. Convert PIL image to numpy array
    3. Apply EfficientNet normalization (scale pixel values)
    4. Add batch dimension (1, 224, 224, 3)
    
    Args:
        image: PIL Image object
    
    Returns:
        numpy array ready for model prediction
    """
    image = image.resize((IMG_SIZE, IMG_SIZE))  # Resize to 224x224
    image = np.array(image)  # Convert PIL Image to numpy array
    image = preprocess_input(image)  # Normalize pixel values using EfficientNet's normalization
    image = np.expand_dims(image, axis=0)  # Add batch dimension: shape becomes (1, 224, 224, 3)
    return image


# ==================== API ENDPOINTS ====================
@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    
    Verifies that the API and model are running correctly.
    Returns: Status, model state, and available waste classes.
    """
    return {
        "status": "healthy",  # API is running
        "model": "loaded",  # Model is loaded and ready
        "classes": CLASS_NAMES  # Available waste classification classes
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Main prediction endpoint.
    
    Accepts an image file and classifies it as biodegradable or non-biodegradable waste.
    
    Args:
        file: Uploaded image file (JPEG, PNG, or WebP)
    
    Returns:
        JSON with prediction, confidence score, and probabilities for each class
    
    Error responses:
        - 400: Invalid file type or corrupted image
        - 413: File too large (exceeds MAX_FILE_SIZE)
        - 500: Prediction error
    """
    try:
        # ========== FILE VALIDATION ==========
        # Check if uploaded file is a supported image format
        allowed_types = {"image/jpeg", "image/png", "image/webp"}
        if file.content_type not in allowed_types:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type. Allowed: {allowed_types}"
            )
        
        # ========== FILE SIZE CHECK ==========
        # Read file contents and check size (prevent large file uploads)
        contents = await file.read()
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail=f"File too large. Max size: {MAX_FILE_SIZE} bytes"
            )
        
        # ========== IMAGE LOADING ==========
        # Convert uploaded bytes to PIL Image and ensure it's RGB
        try:
            image = Image.open(io.BytesIO(contents)).convert("RGB")
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid image format: {str(e)}"
            )
        
        # ========== PREPROCESSING & PREDICTION ==========
        # Preprocess image to match model input requirements
        input_tensor = preprocess(image)
        # Run inference using the loaded model
        prediction = model.predict(input_tensor, verbose=0)
        # Get class with highest probability
        class_name = CLASS_NAMES[np.argmax(prediction)]
        # Get confidence score (probability of predicted class)
        confidence = float(np.max(prediction))
        
        # ========== RETURN RESULTS ==========
        # Return classification result with confidence and detailed probabilities
        return {
            "prediction": class_name,  # The predicted waste category
            "confidence": round(confidence, 4),  # Confidence score (0-1)
            "all_predictions": {  # Probability for each class
                CLASS_NAMES[i]: round(float(prediction[0][i]), 4)
                for i in range(len(CLASS_NAMES))
            }
        }
    
    except HTTPException:
        # Re-raise HTTP exceptions (validation errors)
        raise
    except Exception as e:
        # Catch unexpected errors and return 500 error
        raise HTTPException(
            status_code=500,
            detail=f"Prediction error: {str(e)}"
        )

# ==================== SERVER STARTUP ====================
if __name__ == "__main__":
    print(f"Starting API server on {API_HOST}:{API_PORT}")
    uvicorn.run(
        app,
        host=API_HOST,  # Listen on specified host
        port=API_PORT,  # Listen on specified port
        reload=os.getenv("RELOAD", "false").lower() == "true",  # Auto-reload on code changes (dev mode)
        log_level=os.getenv("LOG_LEVEL", "info").lower()  # Logging level (debug, info, warning, error)
    )
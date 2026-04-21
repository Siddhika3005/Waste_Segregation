from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
import tensorflow as tf
import uvicorn
from tensorflow.keras.applications.efficientnet import preprocess_input
import os
import platform
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

print(f"Running on: {platform.system()}")
print(f"Available GPUs: {tf.config.list_physical_devices('GPU')}")

# Get environment variables with defaults
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", "8080"))
IMG_SIZE = int(os.getenv("IMG_SIZE", "224"))
MODEL_PATH = os.getenv("MODEL_PATH", "waste_model.h5")
DEBUG = os.getenv("DEBUG", "false").lower() == "true"

# Get the absolute path to the model file (cross-platform compatible)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FULL_MODEL_PATH = os.path.join(BASE_DIR, MODEL_PATH)

# Load model
try:
    model = tf.keras.models.load_model(FULL_MODEL_PATH)
    print(f"✓ Model loaded successfully from {FULL_MODEL_PATH}")
except FileNotFoundError:
    print(f"✗ Error: Model file not found at {FULL_MODEL_PATH}")
    print("Please ensure 'waste_model.h5' is in the backend directory")
    raise

CLASS_NAMES = ["bio-degradable", "non-biodegradable"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def preprocess(image):
    image = image.resize((IMG_SIZE, IMG_SIZE))
    image = np.array(image)
    image = preprocess_input(image)
    image = np.expand_dims(image, axis=0)
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(file.file).convert("RGB")
    input_tensor = preprocess(image)
    prediction = model.predict(input_tensor)
    class_name = CLASS_NAMES[np.argmax(prediction)]
    confidence = float(np.max(prediction))
    return {
        "prediction": class_name,
        "confidence": confidence
    }

if __name__ == "__main__":
    print(f"Starting API server on {API_HOST}:{API_PORT}")
    uvicorn.run(
        app,
        host=API_HOST,
        port=API_PORT,
        reload=os.getenv("RELOAD", "false").lower() == "true",
        log_level=os.getenv("LOG_LEVEL", "info")
    )
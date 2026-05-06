"""
TFLite Model Converter - Convert SavedModel to TensorFlow Lite Format

This script converts a TensorFlow SavedModel (stored in saved_model/ directory) to TFLite format.
TFLite is a lightweight model format optimized for mobile and edge devices.

Inputs:
- saved_model/ directory containing the trained model

Outputs:
- waste_model.tflite (optimized model for mobile deployment)
"""

# ==================== IMPORTS ====================
import tensorflow as tf  # TensorFlow framework
import platform  # Platform detection (Windows, macOS, Linux)

# ==================== SYSTEM INFORMATION ====================
print("Platform:", platform.system())
print("Available GPUs:", tf.config.list_physical_devices("GPU"))
print("Loading SavedModel...")

# ==================== DEVICE SELECTION ====================
# Determine which device (GPU or CPU) to use for conversion
# GPU speeds up conversion, but not always available on all systems
device = "/GPU:0" if tf.config.list_physical_devices("GPU") else "/CPU:0"
print(f"Using device: {device}")

# ==================== LOAD MODEL ====================
# Load the SavedModel format (the trained model from training)
with tf.device(device):
    model = tf.saved_model.load("saved_model")  # Load from saved_model directory
    concrete_func = model.signatures["serving_default"]  # Get the default serving signature

# ==================== CONVERT TO TFLITE ====================
print("Converting to TFLite...")

# Create converter from the model's serving function
converter = tf.lite.TFLiteConverter.from_concrete_functions(
    [concrete_func],  # Use the default serving signature
    trackable_obj=model  # Pass trackable object for proper conversion
)

# ==================== OPTIMIZATION SETTINGS ====================
# Apply default optimizations to reduce model size
converter.optimizations = [tf.lite.Optimize.DEFAULT]  # Quantization and other optimizations

# ==================== SUPPORTED OPERATIONS ====================
# Allow both standard TFLite operations and TensorFlow Select operations
# TF Select allows more operations but increases model size
converter.target_spec.supported_ops = [
    tf.lite.OpsSet.TFLITE_BUILTINS,  # Standard TFLite operations
    tf.lite.OpsSet.SELECT_TF_OPS  # Additional TensorFlow operations (needed for dropout, random ops)
]

# ==================== CONVERSION WITH TF SELECT ====================
# Try to convert with TF Select operations first (preferred)
try:
    tflite_model = converter.convert()  # Perform the conversion
    
    # ========== SAVE CONVERTED MODEL ==========
    output_file = "waste_model.tflite"  # Output file name
    with open(output_file, "wb") as f:
        f.write(tflite_model)  # Write binary model to file
    
    print(f"✔ Successfully saved {output_file}")
    print(f"✔ TFLite model includes TF Select ops for dropout support")
    
except Exception as e:
    # ==================== FALLBACK: CONVERSION WITHOUT TF SELECT ====================
    # If conversion fails with TF Select, try without it
    print(f"\n❌ Conversion failed with TF Select: {str(e)}")
    print("\nFallback: Attempting conversion without TF Select...")
    print("Note: This may result in reduced model compatibility")
    
    # Recreate converter without TF Select
    converter = tf.lite.TFLiteConverter.from_concrete_functions(
        [concrete_func],
        trackable_obj=model
    )
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    converter.allow_custom_ops = True  # Allow custom operations
    
    try:
        tflite_model = converter.convert()  # Attempt conversion without TF Select
        output_file = "waste_model.tflite"
        with open(output_file, "wb") as f:
            f.write(tflite_model)  # Write binary model to file
        print(f"✔ Successfully saved {output_file} (with custom ops)")
    except Exception as e2:
        # ========== CONVERSION FAILED ==========
        # Both conversion attempts failed
        print(f"❌ Fallback conversion also failed: {str(e2)}")
        print("\n💡 Recommendation: Use the H5 model format instead (waste_model.h5)")
        print("   The FastAPI backend will work fine with the H5 format for web deployment")
import tensorflow as tf
import platform

print("Platform:", platform.system())
print("Available GPUs:", tf.config.list_physical_devices("GPU"))
print("Loading SavedModel...")

# Determine device based on availability
# Windows: Use GPU (CUDA) if available, otherwise CPU
# macOS: Use CPU to avoid Metal seed/resource issues
device = "/GPU:0" if tf.config.list_physical_devices("GPU") else "/CPU:0"
print(f"Using device: {device}")

with tf.device(device):
    model = tf.saved_model.load("saved_model")
    concrete_func = model.signatures["serving_default"]

print("Converting to TFLite...")

# Correct converter with trackable_obj
converter = tf.lite.TFLiteConverter.from_concrete_functions(
    [concrete_func],
    trackable_obj=model
)

# Optional optimizations
converter.optimizations = [tf.lite.Optimize.DEFAULT]

# Enable TF Select to support stateless random ops (from dropout layers)
converter.target_spec.supported_ops = [
    tf.lite.OpsSet.TFLITE_BUILTINS,
    tf.lite.OpsSet.SELECT_TF_OPS
]

try:
    tflite_model = converter.convert()
    
    # Save file (Cross-platform compatible path)
    output_file = "waste_model.tflite"
    with open(output_file, "wb") as f:
        f.write(tflite_model)
    
    print(f"✔ Successfully saved {output_file}")
    print(f"✔ TFLite model includes TF Select ops for dropout support")
    
except Exception as e:
    print(f"\n❌ Conversion failed with TF Select: {str(e)}")
    print("\nFallback: Attempting conversion without TF Select...")
    print("Note: This may result in reduced model compatibility")
    
    # Try without TF Select
    converter = tf.lite.TFLiteConverter.from_concrete_functions(
        [concrete_func],
        trackable_obj=model
    )
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    converter.allow_custom_ops = True
    
    try:
        tflite_model = converter.convert()
        output_file = "waste_model.tflite"
        with open(output_file, "wb") as f:
            f.write(tflite_model)
        print(f"✔ Successfully saved {output_file} (with custom ops)")
    except Exception as e2:
        print(f"❌ Fallback conversion also failed: {str(e2)}")
        print("\n💡 Recommendation: Use the H5 model format instead (waste_model.h5)")
        print("   The FastAPI backend will work fine with the H5 format for web deployment")
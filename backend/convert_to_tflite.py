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

tflite_model = converter.convert()

# Save file (Cross-platform compatible path)
output_file = "waste_model.tflite"
with open(output_file, "wb") as f:
    f.write(tflite_model)

print(f"✔ Successfully saved {output_file}")
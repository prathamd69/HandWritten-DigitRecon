🧠 Handwritten Digit Recognition API (Flask)

This is the backend of a simple Handwritten Digit Recognition web app. It uses a pre-trained CNN model to classify digits (0–9) from base64-encoded image data sent from the frontend.

📦 Tech Stack

Python 3.8+

Flask

TensorFlow / Keras

Pillow (PIL)

NumPy

CORS enabled for frontend communication

🚀 Features

Accepts base64-encoded images via HTTP POST

Preprocesses and resizes images to 28x28 grayscale

Uses a trained cnn_model.h5 to predict the digit

Returns prediction as JSON response

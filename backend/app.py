from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app)  # allow frontend access from different port (e.g., 5500 → 5000)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        img_data = data['image']
        
        # Decode base64 image
        image_bytes = base64.b64decode(img_data.split(',')[1])
        image = Image.open(BytesIO(image_bytes)).convert('L')
        
        # (Later we'll resize, normalize, predict using model)
        print("Image received and decoded.")

        # Temporary dummy digit
        dummy_prediction = 7

        return jsonify({'digit': dummy_prediction})

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from io import BytesIO
from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model


app = Flask(__name__)
CORS(app)  # allow frontend access from different port (e.g., 5500 → 5000)

model = load_model("ann_model.h5")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        img_data = data['image']
        
        # Decode base64 image
        image_bytes = base64.b64decode(img_data.split(',')[1])
        image = Image.open(BytesIO(image_bytes)).convert('L')
        image = image.resize((28,28))
        image_array = np.array(image)/255.0
        image_array = image_array.reshape(1,28,28)
        
        import matplotlib.pyplot as plt
        plt.imshow(image_array[0], cmap='gray')
        plt.show()

        prediction = model.predict(image_array)
        digit = int(np.argmax(prediction))
        print("Raw prediction:", prediction)
        return jsonify({'digit': digit})

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

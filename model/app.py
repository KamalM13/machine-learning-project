import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
from tensorflow.keras.preprocessing import image
import keras
import numpy as np

app = Flask(__name__)
CORS(app)

print(os.listdir('models'))

models = {
    "InceptionRes": load_model(os.path.join('models',
                                            'best_inception_res.h5')),
    "MobileNet": load_model(os.path.join('models', 'best_model_mobilenet.h5')),
    "ResNet50": load_model(os.path.join('models', 'best_model_resnet50.h5')),
    "Xception": load_model(os.path.join('models', 'best_xception_model.h5')),
    "DenseNet121":
    load_model(os.path.join('models', 'best_densenet_121_model.h5')),
    "ResNet101V2":
    load_model(os.path.join('models', 'best_resnet101v2_model.h5')),
    "InceptionV3":
    load_model(os.path.join('models', 'best_inception_v3_model.h5')),
    "ResNet101": load_model(os.path.join('models', 'ResNet101_model.h5')),
    "VGG16": load_model(os.path.join('models', 'VGG16_model.h5')),
    "DenseNet201": load_model(os.path.join('models', 'DenseNet201_model.h5')),
    "From Scratch": load_model(os.path.join('models', 'scratch_model.h5')),
}

labels = ['Natural', 'Drowsy']


def preprocess_image(img):
    img = img.resize((150, 150))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    # Ensure the image has three color channels (for grayscale images)
    if img_array.shape[-1] == 1:
        img_array = np.repeat(img_array, 3, axis=-1)
    # Add batch dimension (shape will be (150, 150, 3) -> (1, 150, 150, 3))
    img_array = np.expand_dims(img_array, axis=0)

    print(f"Preprocessed image shape: {img_array.shape}")
    print(f"Preprocessed image dtype: {img_array.dtype}")

    return img_array


@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})

    img = Image.open(file)
    preprocessed_img = preprocess_image(img)
    results = []

    for model_name, model in models.items():
        prediction = model.predict(preprocessed_img)

        # Get prediction label and confidence score
        prediction_label = np.argmax(prediction, axis=1)[0]
        confidence_score = prediction[0][prediction_label]
        confidence_percentage = confidence_score * 100

        # Determine the prediction result
        prediction_result = "Drowsy" if prediction_label == 0 else "Natural"

        # Append results to the list
        results.append({
            'model_name': model_name,
            'prediction_result': prediction_result,
            'confidence_percentage': confidence_percentage
        })

    # Sort results by confidence percentage in descending order
    sorted_results = sorted(results,
                            key=lambda x: x['confidence_percentage'],
                            reverse=True)

    return jsonify({
        "results": sorted_results,
    })


if __name__ == '__main__':
    app.run(debug=True)

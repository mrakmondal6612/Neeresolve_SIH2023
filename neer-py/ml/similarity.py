import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.metrics.pairwise import cosine_similarity
import numpy
import requests
from PIL import Image
from io import BytesIO

size = (224, 224)


def load_and_preprocess_image(image_path):
    img = None
    if image_path.startswith("http"):
        # Load image from URL
        response = requests.get(image_path)
        img = Image.open(BytesIO(response.content))
    else:
        # Load local image
        img = image.load_img(image_path, target_size=size)

    img_array = image.img_to_array(img.resize(size))
    img_array = numpy.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array


def extract_features(image_path, model):
    img_array = load_and_preprocess_image(image_path)
    features = model.predict(img_array)
    return features.flatten()


def calculate_cosine_similarity(reference_features, comparison_features):
    similarity = cosine_similarity([reference_features], [comparison_features])  # type: ignore
    return float(similarity[0][0])


def image_similarity(reference_image, comparison_images):
    # Load pre-trained ResNet50 model
    model = ResNet50(weights="imagenet", include_top=False, pooling="avg")

    # Extract features from the reference image
    reference_features = extract_features(reference_image, model)

    similarity_scores = []
    for comparison_image_uri in comparison_images:
        # Extract features from each comparison image
        comparison_features = extract_features(comparison_image_uri, model)

        # Calculate cosine similarity
        similarity_score = calculate_cosine_similarity(
            reference_features, comparison_features
        )
        similarity_scores.append(similarity_score)

    return similarity_scores

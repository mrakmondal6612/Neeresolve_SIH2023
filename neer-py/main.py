from fastapi import FastAPI, Request
from ml.similarity import image_similarity

app = FastAPI()


@app.get("/")
def read_root():
    return {"hello": "world"}


@app.post("/calculate_similarity")
async def calculate_similarity(request: Request):
    data = await request.json()
    image1 = data.get("image1")
    image2 = data.get("image2")
    if not image1 or not image2:
        return {"error": "Please provide two image URLs."}

    result = image_similarity(image1, [image2])
    return {"similarity": result[0]}


@app.post("/classify_image")
async def classify_image(request: Request):
    return {"classes": "hello"}

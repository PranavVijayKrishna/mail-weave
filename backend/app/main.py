from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.ml.classifier import classify_email as ml_classify

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

class EmailData(BaseModel):
    subject: str
    snippet: str

@app.get("/test")
def test_main():
    return {"message": "works!"}

@app.post("/classify")
def classify_email(data: EmailData):
    
    category, confidence = ml_classify(data.subject, data.snippet)

    return {
        "category": category,
        "confidence": confidence
    }


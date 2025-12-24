from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

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
    # Hardcoded return for now
    return {
        "category": "Academic",
        "confidence": 0.9
    }


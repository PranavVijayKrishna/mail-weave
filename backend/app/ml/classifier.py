ACADEMIC = ["homework", "assignment", "exam", "quiz", "deadline", "lecture", "class", "professor", "study", "test"]
SUBSCRIPTION = ["unsubscribe", "receipt", "invoice", "billing", "payment", "subscription", "order"]
SOCIAL = ["invited", "birthday", "party", "event", "celebration", "wedding"]

# temporary classification
def classify_email(subject: str, snippet: str):
    text = f"{subject} {snippet}".lower()

    if any(word in text for word in ACADEMIC):
        return "ACADEMIC", 0.9
    if any(word in text for word in SUBSCRIPTION):
        return "SUBSCRIPTION", 0.85
    if any(word in text for word in SOCIAL):
        return "SOCIAL", 0.8
    
    return "OTHER", 0.6


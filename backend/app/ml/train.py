import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import joblib

print("Reading dataset")
df = pd.read_csv('email_training_data.csv')
print(f"Total samples: {len(df)}")
print(f"Categories: {df['label'].unique()}")
print(f"\nLabel distribution:")
print(df['label'].value_counts())

X = df['text']
y = df['label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 42, stratify = y)

print(f"\nTraining samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")

print("\nCreating TF-IDF features")
vectorizer = TfidfVectorizer(max_features = 100)
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

print("Training Logistic Regression model")
model = LogisticRegression(max_iter = 1000, random_state = 42)
model.fit(X_train_tfidf, y_train)

y_pred = model.predict(X_test_tfidf)
accuracy = accuracy_score(y_test, y_pred)

print(f"\n{'='*50}")
print(f"MODEL PERFORMANCE")
print(f"{'='*50}")
print(f"Accuracy: {accuracy:.2%}")
print(f"\nDetailed Report:")
print(classification_report(y_test, y_pred))

# Save model and vectorizer
print("\nSaving model and vectorizer...")
joblib.dump(model, 'email_classifier_model.pkl')
joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')

print("Model saved successfully!")
print("   - email_classifier_model.pkl")
print("   - tfidf_vectorizer.pkl")
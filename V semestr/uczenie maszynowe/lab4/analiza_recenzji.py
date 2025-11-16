import pandas as pd
from sklearn.utils import shuffle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.metrics import classification_report

# --- KROK 1: Wczytanie danych ---
try:
    with open('positive.txt', 'r', encoding='utf-8') as file:
        positive_data = file.readlines()
    
    with open('negative.txt', 'r', encoding='utf-8') as file:
        negative_data = file.readlines()
except FileNotFoundError as e:
    print(f"BLAD: Nie znaleziono pliku {e.filename}.")
    print("Upewnij sie, ze pliki 'positive.txt' i 'negative.txt' sa w tym samym katalogu.")
    exit()

# --- KROK 2 i 3: Utworzenie DataFrame i przypisanie klas ---
positive_df = pd.DataFrame({'text': positive_data, 'class': 0})
negative_df = pd.DataFrame({'text': negative_data, 'class': 1})
df = pd.concat([positive_df, negative_df], ignore_index=True)

# --- KROK 4: Mieszanie danych ---
df = shuffle(df, random_state=42)

# --- KROK 5 (z PDF 2): Podzial na zbior uczacy i testowy ---
X_train, X_test, y_train, y_test = train_test_split(
    df['text'], df['class'], 
    test_size=0.2, 
    random_state=42
)

# --- KROK 3 (z PDF 2): Definicja klasyfikatorow ---
classifiers = [
    ('Decision Tree', DecisionTreeClassifier(random_state=42)),
    ('Random Forest', RandomForestClassifier(n_estimators=100, random_state=42)),
    ('SVM', SVC())
]

# --- KROK 6 (z PDF 2): Definicja wektoryzatorow ---
vectorizers = [
    ('Default Vectorizer', CountVectorizer()),
    ('Min 3 Chars Vectorizer', CountVectorizer(token_pattern=r'\b\w{3,}\b')) # POPRAWKA
]

print("Rozpoczynam testowanie potokow (Wektoryzator + Klasyfikator)...\n")
results = [] 

# --- KROK 4 i 6 (z PDF 2): Petla testujaca ---
for vec_name, vectorizer in vectorizers:
    for classifier_name, classifier in classifiers:
        
        print(f"--- TESTOWANIE: ({vec_name}) + ({classifier_name}) ---")
        
        pipeline = Pipeline([
            ('vectorizer', vectorizer),
            ('classifier', classifier)
        ])
        
        # Walidacja krzyzowa
        cv_scores = cross_val_score(pipeline, X_train, y_train, cv=5, scoring='accuracy')
        
        # Trenowanie
        pipeline.fit(X_train, y_train)
        
        # Predykcja
        y_pred = pipeline.predict(X_test)
        
        # Raport
        report_str = classification_report(y_test, y_pred)
        
        # Zapis wynikow
        results.append({
            'Vectorizer': vec_name,
            'Classifier': classifier_name,
            'Mean Accuracy': cv_scores.mean(),
            'Cross-Validation Scores': cv_scores,
            'Classification Report': report_str
        })

# --- KROK 5 (z PDF 2): Wyswietlanie wynikow ---
print("\n--- ZAKONCZONO TESTOWANIE. PODSUMOWANIE WYNIKOW: ---\n")

for result in results:
    print(f"Vectorizer: {result['Vectorizer']}")
    print(f"Classifier: {result['Classifier']}")
    print(f"Cross-Validation Scores: {result['Cross-Validation Scores']}")
    print(f"Mean CV Accuracy (na zbiorze treningowym): {result['Mean Accuracy']:.4f}")
    print("Classification Report (na zbiorze testowym):")
    print(result['Classification Report'])
    print("=" * 60 + "\n")
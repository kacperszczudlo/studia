"""Eksploracja danych >> Odkrywanie predykcyjne"""

__author__ = "Tomasz Potempa, mod. Kacper Szczudło"
__version__ = "3.0.0" # Wersja uproszczona

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

def classifier_decision_tree(df, features_columns, target_column, test_size=0.3):
    """
    Tworzy, uczy i ocenia model klasyfikacyjny Drzewa Decyzyjnego.
    WERSJA UPROSZCZONA: nie generuje wykresu drzewa.
    """
    X = df[features_columns]
    y = df[target_column]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42, stratify=y)

    model = DecisionTreeClassifier(criterion='gini', max_depth=4, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    # Ocena modelu
    accuracy = accuracy_score(y_test, y_pred)
    conf_matrix = confusion_matrix(y_test, y_pred)
    class_report = classification_report(y_test, y_pred)

    values = [
        ["Metoda", "DECISIONTREECLASSIFIER"],
        ["Rozmiar zbioru uczącego", len(X_train)],
        ["Rozmiar zbioru testowego", len(X_test)],
        ["Skuteczność (Accuracy)", f"{accuracy:.2%}"]
    ]
    description = pd.DataFrame(data=values, columns=["Metryka", "Wartość"])

    results = {
        "confusion_matrix": conf_matrix,
        "classification_report": class_report
    }

    return model, description, results
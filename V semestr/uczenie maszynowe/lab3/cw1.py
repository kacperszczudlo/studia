from sklearn.feature_extraction.text import CountVectorizer

documents = [
    "To jest pierwszy dokument.",
    "Dokument numer dwa.",
    "Ostatni dokument w tym zbiorze."
]

vectorizer = CountVectorizer()

X = vectorizer.fit_transform(documents)

print("Slownik (unikalne slowa):", vectorizer.get_feature_names_out())
print("Macierz Bag of Words:")
print(X.toarray())
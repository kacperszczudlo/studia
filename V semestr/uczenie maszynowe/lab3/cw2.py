import re

documents = [
    "To jest pierwszy dokument.",
    "Dokument numer dwa.",
    "Ostatni dokument w tym zbiorze."
]

def preprocess_text(text):
    text = re.sub(r'[^\w\s]', '', text.lower())
    tokens = text.split()
    return tokens

word_counts = {}
for document in documents:
    tokens = preprocess_text(document)
    for token in tokens:
        word_counts[token] = word_counts.get(token, 0) + 1

vocabulary = sorted(list(word_counts.keys()))

bow_matrix = []
for document in documents:
    tokens = preprocess_text(document)
    bow_vector = [tokens.count(word) for word in vocabulary]
    bow_matrix.append(bow_vector)

print("Slownik (unikalne slowa):", vocabulary)

print("Macierz Bag of Words:")
for bow_vector in bow_matrix:
    print(bow_vector)

vocabulary = ['dwa', 'dokument', 'jest', 'numer', 'ostatni', 'pierwszy', 'to', 'tym', 'zbiorze']
bow_matrix = [
    [0, 1, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 1]
]

print("\nODKODOWANIE\nInterpretacja macierzy Bag of Words:")
for i, doc_vector in enumerate(bow_matrix):
    print(f"Slowa w dokumencie {i+1}:")
    decoded_words = []
    for j, count in enumerate(doc_vector):
        if count > 0:
            word = vocabulary[j]
            decoded_words.append(f"'{word}' (x{count})")
    print("  " + ", ".join(decoded_words))
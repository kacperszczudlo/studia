# C:\Users\kacpe\Documents\GitHub\Data-Mining-1.0\analiza_klientow.py

"""Eksploracja danych: UPROSZCZONA Segmentacja i Klasyfikacja Klientów Poczty"""

__author__ = "Kacper Szczudło"
__version__ = "3.0.1"  # Poprawka NameError

# Importy z naszego projektu
from data.datasources import connect
from data.normalization import normalize
from data.mining.descriptive import central_clustering, visualize
from data.mining.predictive import classifier_decision_tree

# Importy bibliotek zewnętrznych
import pandas as pd
import warnings
import seaborn as sns
import matplotlib.pyplot as plt

warnings.filterwarnings("ignore")
pd.set_option('display.width', 1000)
pd.set_option('display.max_columns', 20)

# ===================================================================
# ======================= ZAPYTANIE SQL =============================
# ===================================================================

customer_profiling_query = """
                           WITH nadawcy_profil AS (SELECT n.id_nadawcy, \
                                                          imie || ' ' || nazwisko                AS nadawca, \
                                                          n.data_urodzenia, \
                                                          CASE n.plec WHEN 'M' THEN 1 ELSE 0 END AS plec_m, \
                                                          SUM(s.cena)                            AS laczna_wartosc, \
                                                          COUNT(*)                               AS liczba_przesylek, \
                                                          AVG(s.cena)                            AS srednia_wartosc_przesylki, \
                                                          CAST( \
                                                                  100.0 * COUNT(*) FILTER \
                                                                  (WHERE u.szybkosc = 'priorytetowa') / COUNT(*) \
                                                              AS numeric (5, 2) \
                                                          )                                      AS procent_priorytetow \
                                                   FROM poczta_olap.sprzedaz s \
                                                            JOIN poczta_olap.nadawca n ON s.id_nadawcy = n.id_nadawcy \
                                                            JOIN poczta_olap.usluga u ON s.id_uslugi = u.id_uslugi \
                                                   GROUP BY n.id_nadawcy, n.imie, n.nazwisko, n.data_urodzenia, n.plec)
                           SELECT nadawca, \
                                  CAST(EXTRACT(YEAR FROM age(data_urodzenia)) AS integer) AS wiek, \
                                  plec_m, \
                                  laczna_wartosc, \
                                  liczba_przesylek, \
                                  srednia_wartosc_przesylki, \
                                  procent_priorytetow
                           FROM nadawcy_profil
                           ORDER BY nadawca \
                           """


# ===================================================================
# ======================== GŁÓWNA FUNKCJA ===========================
# ===================================================================

def przeprowadz_analize():
    """Główna, uproszczona funkcja orkiestrująca analizę."""

    print(">>> START ANALIZY: SEGMENTACJA I KLASYFIKACJA KLIENTÓW")

    # --------------------------------------------------------------------
    # Część 1: Wczytanie i przygotowanie danych
    # --------------------------------------------------------------------
    print("\n[Część 1] Wczytywanie i przygotowywanie danych...")
    rs = connect(customer_profiling_query)
    df = pd.DataFrame(rs, columns=[
        "nadawca", "wiek", "plec_m", "laczna_wartosc",
        "liczba_przesylek", "srednia_wartosc_przesylki", "procent_priorytetow"
    ])
    print(f"Wczytano profile {len(df)} klientów.")

    # Normalizacja danych
    df_for_clustering = df.set_index("nadawca")
    scaled_features = normalize(df_for_clustering)
    df_scaled = pd.DataFrame(data=scaled_features, columns=df_for_clustering.columns, index=df_for_clustering.index)

    # --------------------------------------------------------------------
    # Część 2: Analiza Skupień (Segmentacja Klientów)
    # --------------------------------------------------------------------
    print("\n[Część 2] Przeprowadzanie segmentacji klientów...")
    OPTIMAL_K = 4
    print(f"Wybrano k = {OPTIMAL_K} jako optymalną liczbę skupień.")

    model, df_grouped, description = central_clustering(k=OPTIMAL_K, df=df_scaled.reset_index())

    # Łączymy wyniki z oryginalnymi danymi
    df_final_segments = df.copy()
    df_final_segments['grupa'] = df_grouped['grupa']

    print("\nCharakterystyka (średnie wartości) dla każdego segmentu klienta:")
    segment_characteristics = df_final_segments.drop('nadawca', axis=1).groupby('grupa').mean().round(2)
    print(segment_characteristics)  # <-- POPRAWKA: Usunięto os.linesep
    print()  # Dodajemy pustą linię dla czytelności

    # Generujemy tylko JEDEN, najważniejszy wykres segmentacji
    visualize(df_final_segments)

    # --------------------------------------------------------------------
    # Część 3: Budowa Modelu Predykcyjnego (Klasyfikacja)
    # --------------------------------------------------------------------
    print("\n[Część 3] Budowa modelu do klasyfikacji klientów do segmentów...")

    features = ['wiek', 'plec_m', 'laczna_wartosc', 'liczba_przesylek', 'srednia_wartosc_przesylki',
                'procent_priorytetow']
    target = 'grupa'

    model_tree, desc_tree, results_tree = classifier_decision_tree(
        df=df_final_segments,
        features_columns=features,
        target_column=target
    )

    print("\nOpis modelu klasyfikacyjnego (Drzewo Decyzyjne):")
    print(desc_tree)  # <-- POPRAWKA: Usunięto os.linesep
    print()  # Dodajemy pustą linię dla czytelności

    print("Raport klasyfikacji:")
    print(results_tree['classification_report'])
    print()  # Dodajemy pustą linię dla czytelności

    # Generujemy tylko JEDEN, najważniejszy wykres macierzy pomyłek
    print("Macierz pomyłek (Confusion Matrix):")
    plt.figure(figsize=(8, 6))
    sns.heatmap(results_tree['confusion_matrix'], annot=True, fmt='d', cmap='Blues',
                xticklabels=model_tree.classes_, yticklabels=model_tree.classes_)
    plt.xlabel('Przewidziany Segment')
    plt.ylabel('Prawdziwy Segment')
    plt.title('Macierz Pomyłek')
    plt.show()

    print("\n>>> ANALIZA ZAKOŃCZONA POWODZENIEM!")


# ===================================================================
# =================== URUCHOMIENIE EKSPERYMENTU =====================
# ===================================================================

if __name__ == "__main__":
    przeprowadz_analize()
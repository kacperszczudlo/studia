"""Eksploracja danych >> Odkrywanie deskrypcyjne"""

__author__ = "Tomasz Potempa"
__version__ = "2.0.0" # Wersja uproszczona

import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

def normalize(df):
    """Normalizacja danych z wykorzystaniem standaryzacji statystycznej"""
    scaler = StandardScaler()
    return scaler.fit_transform(df)

def central_clustering(k, df, n_init=25):
    """Grupowanie algorytmem K-Means"""
    model = KMeans(init="random", n_clusters=k, n_init=n_init, random_state=42)
    groups = model.fit_predict(df.iloc[0:, 1:].to_numpy())
    df_grouped = pd.concat([df, pd.DataFrame(data=groups, columns=["grupa"])], axis=1)
    ss = silhouette_score(df_grouped.iloc[0:, 1:], model.labels_, metric="euclidean")
    values = [["Algorytm", "KMEANS"], ["Liczba skupień k", k], ["Wskaźnik Silhouette:", ss]]
    description = pd.DataFrame(data=values, columns=["Metryka", "Wartość"])
    return model, df_grouped, description

def visualize(df_final_segments):
    """Tworzy JEDEN kluczowy wykres segmentacji."""
    colors = ["blue", "orange", "red", "green", "magenta"]
    plt.figure(figsize=(15, 10))
    plt.title("Segmentacja Klientów: Wartość vs Liczba Przesyłek")

    # Używamy pętli, aby dodać legendę automatycznie
    for i in sorted(df_final_segments['grupa'].unique()):
        cluster = df_final_segments[df_final_segments.grupa == i]
        plt.scatter(cluster['laczna_wartosc'], cluster['liczba_przesylek'],
                    color=colors[i], label=f'Segment {i}')

    plt.xlabel("Całkowita wartość przesyłek [PLN]")
    plt.ylabel("Liczba nadanych przesyłek")
    plt.legend()
    plt.grid(True)
    plt.show()
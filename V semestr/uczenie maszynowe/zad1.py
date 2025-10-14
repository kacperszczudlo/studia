# Ćwiczenie 1
import pandas as pd
from sklearn.datasets import load_iris

iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['target'] = iris.target

print("Pierwsze 5 wierszy zbioru danych Iris:")
print(df.head())

# Ćwiczenie 2
missing_data = df.isnull().sum()
print("Brakujace dane w kazdej kolumnie:")
print(missing_data)

df_cleaned = df.dropna()
# W zbiorze nie ma żadnych brakujących wartości

# Ćwiczenie 3
import matplotlib.pyplot as plt

plt.figure(figsize=(8, 6))
for species in df_cleaned['target'].unique():
    subset = df_cleaned[df_cleaned['target'] == species]
    plt.scatter(subset['petal length (cm)'], subset['petal width (cm)'],
                label=iris.target_names[species])
plt.xlabel('petal length (cm)')
plt.ylabel('petal width (cm)')
plt.title('Zależność długości od szerokości płatka korony')
plt.legend()
plt.show()
# Wymiary płatków (petal) pozwalają znacznie lepiej rozdzielić gatunki niż wymiary działek kielicha (sepal)

# Ćwiczenie 4
class_counts = df['target'].value_counts()

print("Liczba probek w kazdej klasie:")
print(class_counts)

# Ćwiczenie 5
chosen_feature = "sepal length (cm)"
plt.figure(figsize=(8, 6))
plt.hist(df[chosen_feature], bins=20, edgecolor='k')
plt.xlabel(chosen_feature)
plt.ylabel('Liczba Próbek')
plt.title(f'Histogram dla {chosen_feature}')
plt.show()

chosen_feature_target = "target"

plt.figure(figsize=(8, 6))
plt.hist(df[chosen_feature_target], bins=3, edgecolor='k')
plt.xlabel(chosen_feature_target)
plt.ylabel('Liczba Próbek')
plt.xticks([0, 1, 2], labels=iris.target_names) 
plt.title(f'Histogram dla {chosen_feature_target}')
plt.show()
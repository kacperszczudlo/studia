import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.preprocessing import StandardScaler
from mpl_toolkits.mplot3d import Axes3D
from sklearn.linear_model import LogisticRegression
from mlxtend.plotting import plot_decision_regions

# Ćwiczenie 1: Generowanie przestrzeni cech
X, y = make_classification(
    n_samples=200,
    n_features=2,
    n_redundant=0,
    n_informative=2,
    n_clusters_per_class=1,
    random_state=42
)

plt.figure()
plt.scatter(X[:, 0], X[:, 1], c=y, cmap='bwr', edgecolor='k')
plt.title("Przestrzeń cech - dane 2D")
plt.xlabel("Cecha 1")
plt.ylabel("Cecha 2")
plt.show()


# Ćwiczenie 2: Skalowanie i analiza cech
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

plt.figure()
plt.scatter(X_scaled[:, 0], X_scaled[:, 1], c=y, cmap='bwr', edgecolor='k')
plt.title("Przestrzeń cech - po skalowaniu")
plt.xlabel("Cecha 1 (scaled)")
plt.ylabel("Cecha 2 (scaled)")
plt.show()


# Ćwiczenie 3: Dodanie nowej cechy
X_new = np.column_stack([X_scaled, X_scaled[:, 0]**2])

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(X_new[:, 0], X_new[:, 1], X_new[:, 2], c=y, cmap='bwr', edgecolor='k')
ax.set_xlabel("Cecha 1 (scaled)")
ax.set_ylabel("Cecha 2 (scaled)")
ax.set_zlabel("Nowa cecha = (Cecha 1)^2")
ax.set_title("Przestrzeń cech 3D")
plt.show()


# Ćwiczenie 4: Model i granica decyzyjna
model = LogisticRegression()
model.fit(X_scaled, y)

plt.figure()
plot_decision_regions(X_scaled, y, clf=model, legend=2)
plt.xlabel("Cecha 1 (scaled)")
plt.ylabel("Cecha 2 (scaled)")
plt.title("Granica decyzyjna modelu regresji logistycznej")
plt.show()
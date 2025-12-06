import pandas as pd
from sklearn.model_selection import train_test_split

# Wczytanie danych
df = pd.read_csv('Home_prices.csv')

# --- 1. Załaduj dane i 2. Wyświetl pierwsze wiersze oraz opisz kolumny ---

print("## Pierwsze 5 wierszy danych:")
# Użycie .head() bez to_markdown() rozwiązuje problem z biblioteką 'tabulate'
print(df.head().to_string())

print("\n## Informacje o danych (typ danych, wartości Not-a-Number (NaN)):")
# df.info() działa dobrze bez zmian
df.info()

print("\n## Podsumowanie statystyczne kolumn numerycznych:")
print(df.describe().T.to_string())

# --- 3. Sprawdź brakujące dane i uzupełnij je lub usuń ---

# Sprawdzenie brakujących wartości
missing_values = df.isnull().sum()
missing_values = missing_values[missing_values > 0].sort_values(ascending=False)

print("\n## Liczba i procent brakujących wartości w kolumnach:")
missing_df = pd.DataFrame({
    'Liczba braków': missing_values,
    'Procent braków': (missing_values / len(df)) * 100
})
print(missing_df.to_string())

# Kolumny do usunięcia na podstawie dużej ilości braków i kontekstu
columns_to_drop = ['PoolQC', 'MiscFeature', 'Alley', 'Fence']
df = df.drop(columns=columns_to_drop)

# Obsługa kolumn związanych z brakiem obiektu (np. FireplaceQu, GarageType, BsmtQual, itp.)

# Kolumny, gdzie NaN oznacza "Brak" (No)
no_feature_cols = ['FireplaceQu', 'GarageType', 'GarageFinish', 'GarageQual', 'GarageCond', 
                   'BsmtQual', 'BsmtCond', 'BsmtExposure', 'BsmtFinType1', 'BsmtFinType2',
                   'MasVnrType']
for col in no_feature_cols:
    df[col] = df[col].fillna('None')

# Kolumny numeryczne, gdzie NaN oznacza 0 (brak powierzchni)
zero_cols = ['GarageYrBlt', 'GarageCars', 'GarageArea', 'BsmtFinSF1', 'BsmtFinSF2', 
             'BsmtUnfSF', 'TotalBsmtSF', 'BsmtFullBath', 'BsmtHalfBath', 'MasVnrArea']
for col in zero_cols:
    df[col] = df[col].fillna(0)

# Uzupełnienie LotFrontage medianą dla danej dzielnicy
df['LotFrontage'] = df.groupby('Neighborhood')['LotFrontage'].transform(lambda x: x.fillna(x.median()))
# Uzupełnienie pozostałych brakujących wartości kategorycznych wartością modalną
for col in df.select_dtypes(include='object').columns:
    if df[col].isnull().any():
        df[col] = df[col].fillna(df[col].mode()[0])
        
# Weryfikacja braków danych:
print("\n## Ostateczna weryfikacja braków danych (Maksymalna liczba braków):")
max_missing = df.isnull().sum().max()
print(max_missing) # Powinno być 0

# Usunięcie kolumny 'Id', która nie jest potrzebna do modelowania
df = df.drop(columns=['Id'])

# Konwersja zmiennych kategorycznych na zmienne zero-jedynkowe (One-Hot Encoding)
df_encoded = pd.get_dummies(df, drop_first=True)

print("\n## Kształt danych po One-Hot Encoding:")
print(df_encoded.shape)

print("\n## Pierwsze 5 wierszy danych po kodowaniu:")
print(df_encoded.head().to_string())


# --- 4. Podziel dane na cechy (X) i zmienną docelową (y) ---
# Zmienna docelowa to SalePrice
X = df_encoded.drop('SalePrice', axis=1)
y = df_encoded['SalePrice']

print("\n## Kształty zbioru cech (X) i zmiennej docelowej (y):")
print(f"Kształt X: {X.shape}")
print(f"Kształt y: {y.shape}")


# --- 5. Podziel zbiór na treningowy i testowy (np. 80/20) ---
# Używamy train_test_split z test_size=0.2 (20%) i random_state=42 dla powtarzalności
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("\n## Podział na zbiór treningowy i testowy (80/20):")
print(f"Kształt X_train: {X_train.shape}")
print(f"Kształt X_test: {X_test.shape}")
print(f"Kształt y_train: {y_train.shape}")
print(f"Kształt y_test: {y_test.shape}")
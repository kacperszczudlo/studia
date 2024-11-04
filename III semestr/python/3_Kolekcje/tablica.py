#ukończono

wiersze, kolumny = 3, 5
tab = [[0 for _ in range(kolumny)] for _ in range(wiersze)]

liczba = 1
for i in range(wiersze):
    for j in range(kolumny):
        tab[i][j] = liczba ** 2
        liczba += 1

for wiersz in tab:
    print(wiersz)

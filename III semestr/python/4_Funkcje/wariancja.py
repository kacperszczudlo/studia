#ukonczono

def srednia_wariancja(tablica):
    N = len(tablica)
    
    suma = 0
    for i in range(N):
        suma += tablica[i]
    srednia = suma / N
    
    suma_kwadratow = 0
    for i in range(N):
        suma_kwadratow += (tablica[i] - srednia) ** 2
    wariancja = suma_kwadratow / (N - 1)
    
    return srednia, wariancja
    
def main():

    tablica = []
    while True:
        liczba = float(input("Podaj liczbę (0, aby zakończyć): "))
        if liczba == 0:
            break
        tablica.append(liczba)

    srednia, wariancja = srednia_wariancja(tablica)
    print(f"Średnia wynosi: {srednia}")
    print(f"Wariancja wynosi: {wariancja}")

    srednia, wariancja = srednia_wariancja([3, 3, 3, 3])
    print(f"Średnia dla [3,3,3,3] wynosi: {srednia}")
    print(f"Wariancja dla [3,3,3,3] wynosi: {wariancja}")

    srednia, wariancja = srednia_wariancja([5, 6, 7, 8, 9])
    print(f"Średnia dla [5,6,7,8,9] wynosi: {srednia}")
    print(f"Wariancja dla [5,6,7,8,9]  wynosi: {wariancja}")
    
main()

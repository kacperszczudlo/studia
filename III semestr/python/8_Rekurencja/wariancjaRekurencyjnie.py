#ukonczono

def srednia_wariancja(lista, dlugosc, suma=0):
    if not lista:
        if dlugosc == 0:
            return None, None
        srednia = suma / dlugosc
        return srednia, 0

    glowa, *reszta = lista
    srednia, wariancja = srednia_wariancja(reszta, dlugosc, suma + glowa)
    wariancja += ((glowa - srednia) ** 2) / dlugosc
    return srednia, wariancja

def main():
    lista1 = [3, 3, 3, 3]
    lista2 = [5, 6, 7, 8, 9]
    lista3 = []

    wynik1 = srednia_wariancja(lista1, len(lista1))
    wynik2 = srednia_wariancja(lista2, len(lista2))
    wynik3 = srednia_wariancja(lista3, len(lista3))

    if len(lista1) > 1:
        wynik1 = (wynik1[0], wynik1[1] * (len(lista1) / (len(lista1) - 1)))
    if len(lista2) > 1:
        wynik2 = (wynik2[0], wynik2[1] * (len(lista2) / (len(lista2) - 1)))

    print(f"Lista1: średnia = {wynik1[0]}, wariancja = {wynik1[1]}")
    print(f"Lista2: średnia = {wynik2[0]}, wariancja = {wynik2[1]}")
    print(f"Lista3: średnia = {wynik3[0]}, wariancja = {wynik3[1]}")

main()

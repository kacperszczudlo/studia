#ukończono

def dodaj_parzyste(x, lista_calkowite):
    
    return list(map(lambda lista: [x] + lista, filter(lambda lista: any(map(lambda x: x % 2 == 0, lista)), lista_calkowite)))

def main():
    listy = [[1, 2, 3], [1, 3, 5], [2, 4, 6]]
    liczba = 7

    print(dodaj_parzyste(liczba, listy))
main()

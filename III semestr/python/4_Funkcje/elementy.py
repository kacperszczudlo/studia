#ukonczono

def wspolne(sekwencja1, sekwencja2):
    wspolne_elementy = set()
    for element in sekwencja1:
        if element in sekwencja2:
            wspolne_elementy.add(element)
    return list(wspolne_elementy)

def main():
    krotka1 = (3, 3, 4, 5)
    krotka2 = (3, 3, 2, 5)
    
    wynik = wspolne(krotka1, krotka2)
    print(wynik)

main()

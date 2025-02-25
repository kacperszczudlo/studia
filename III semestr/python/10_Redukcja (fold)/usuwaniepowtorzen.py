from functools import reduce

def niefunkcyjna(lst):
    wynik = []
    for elem in lst:
        if elem not in wynik or elem != wynik[-1]:
            wynik.append(elem)
    return wynik

def usun_parzyste(lst):
    return reduce(lambda wynik, elem: wynik + [elem] if elem % 2 != 0 else wynik, lst, [])

def usun_powtorzenia(lst):
    return reduce(lambda wynik, elem: wynik + [elem] if elem not in wynik or elem != wynik[-1] else wynik, lst, [])

def main():
    lst = [1, 1, 2, 2, 2, 2, 3, 3, 1]
    print(niefunkcyjna(lst))
    print(usun_parzyste(lst))
    print(usun_powtorzenia(lst))

main()

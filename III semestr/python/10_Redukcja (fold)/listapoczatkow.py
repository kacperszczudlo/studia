#ukończono

from functools import reduce

def lista_poczatkow_reduce(lst):
    return reduce(lambda wynik, elem: wynik + [wynik[-1] + [elem]], lst, [[]])

def lista_poczatkow_map(lst):
    return reduce(lambda wynik, elem: list(map(lambda x: [elem] + x, wynik)) + [[]], reduce(lambda wynik, elem: [elem] + wynik, lst, []), [[]])[::-1]

def main():
    lst = [1, 2, 3, 4, 5]
    print(lista_poczatkow_reduce(lst))
    print(lista_poczatkow_map(lst))

main()

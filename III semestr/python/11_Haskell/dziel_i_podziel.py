#ukończono

import inspect
import math
import operator


class Haskell:        
    def __init__(self, func, num_args=None):
        self.func = func
        self.num_args = func.__code__.co_argcount if num_args==None else num_args

    def __pow__(self, other):
        return (lambda *args, **kw: self.func(other(*args, **kw)))

    def __call__(self, *a):
        if len(a) == self.num_args:
            return self.func(*a)
        def q(*b):
            return self.func(*(a + b))
        return Haskell(q, self.num_args - len(a))
def flip(f):
    return Haskell(lambda y, x: f(x, y))

def dodaj_i_podziel_wersja_a(lst):
    add_haskell = Haskell(operator.add,2)
    truediv_haskell = flip(Haskell(operator.truediv,2))
    add_div = truediv_haskell(2) ** add_haskell(3)
    return map(add_div,lst)
def dodaj_i_podziel_wersja_b(lst):
    add_haskell = Haskell(operator.add,2)
    truediv_haskell = flip(Haskell(operator.truediv,2))
    mapa_haskell_dodaj_i_podziel = Haskell(map,2)(truediv_haskell(2)) ** Haskell(map,2)(add_haskell(3))
    return mapa_haskell_dodaj_i_podziel(lst)

def main():
    lista_do_zadania = [1,2,3,4,5,6]
    print(list(dodaj_i_podziel_wersja_a(lista_do_zadania)))
    print(list(dodaj_i_podziel_wersja_b(lista_do_zadania)))


main()
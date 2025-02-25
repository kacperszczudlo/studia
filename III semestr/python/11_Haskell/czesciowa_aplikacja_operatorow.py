#ukończono

import inspect
from functools import partial
from operator import add, gt, truediv, pow

class Haskell:        
    def __init__(self, func, num_args=None):
        signature = inspect.signature(func)
        self.num_args = len(signature.parameters)
        self.func = func

    def __pow__(self, other):
        def composed(*args, **kwargs):
            return self.func(other(*args, **kwargs))
        return composed

    def __call__(self, *a):
        if len(a) == self.num_args:
            return self.func(*a)
        def q(*b):
            return self.func(*(a + b))
        return Haskell(q, self.num_args - len(a))

def flip(f):
    def flipped(x, y):
        return f(y, x)
    return Haskell(flipped)

@Haskell
def c_add(x, y):
    return add(x, y)

@Haskell
def c_less(x, y):
    return gt(x, y)

def main():
    add_one = c_add(1)
    lista = [1, 2, 3, 4, 5, 6]
    wynik = list(map(add_one, lista))
    print("Wynik mapowania:", wynik)

    less_than_3 = c_less(3)
    lista2 = [1, 2, 3, 4, 3, 2, 1]
    wynik2 = list(filter(less_than_3, lista2))
    print("Wynik filtrowania:", wynik2)

main()

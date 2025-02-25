#ukończono

import inspect
from operator import pow

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

sq = flip(pow)(2)
cube = flip(pow)(3)
sqrt = flip(pow)(0.5)
rev = flip(pow)(-1)

def main():
    print("sq(4):", sq(4))
    print("cube(4):", cube(4))
    print("sqrt(4):", sqrt(4))
    print("rev(4):", rev(4))

main()

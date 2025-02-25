#ukończono

 inspect
from operator import add, truediv

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

add3_operator = Haskell(lambda x: add(3, x))
half_operator = flip(truediv)(2)

def main():
    result = half_operator(add3_operator(5))
    print("Wynik:", result)

    composed = half_operator ** add3_operator
    result_composed = composed(5)
    print("Wynik złożonej funkcji:", result_composed)

main()

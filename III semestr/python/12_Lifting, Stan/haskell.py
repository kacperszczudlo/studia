import inspect
class Haskell:    
    def __init__(self, func, num_args=None):
        self.func = func
        if num_args!=None:
            self.num_args = num_args
        else:    
            try:
                signature = inspect.signature(func)
                self.num_args = len(signature.parameters)
            except ValueError:
                raise ValueError('Należy podać liczbę parametrów')
        
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
    

@Haskell
def lift1(f, ma):
    return None if ma == None else f(ma)

@Haskell
def lift2(f, a, b):
    return None if a==None or b == None else f(a,b)        
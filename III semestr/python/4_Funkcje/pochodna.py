#ukonczono

import math

def kwadrat(x):
    return x ** 2
    
def pochodna(f, x, h=0.0001):
    return (f(x + h) - f(x)) / h

def main():
    sin_1 = pochodna(math.sin, 1)
    sin_0 = pochodna(math.sin, 0)
    kwadrat_1 = pochodna(kwadrat, 1, 0.00001)
    
    print(f"Pochodna sin(x) w punkcie 1: {sin_1}")
    print(f"Pochodna sin(x) w punkcie 0: {sin_0}")
    print(f"Pochodna x^2 w punkcie 1: {kwadrat_1}")

main()

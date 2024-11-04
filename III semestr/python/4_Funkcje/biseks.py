#ukonczono

import math

def bisekcja(f, x1, x2, eps):
    if f(x1) * f(x2) >= 0:
        raise ValueError("Funkcja musi mieć różne znaki na końcach przedziału.")
    
    while (x2 - x1) / 2.0 > eps:
        midpoint = (x1 + x2) / 2.0
        if f(midpoint) == 0:
            return midpoint
        elif f(x1) * f(midpoint) < 0:
            x2 = midpoint
        else:
            x1 = midpoint
            
    return (x1 + x2) / 2.0

def wielomian(x):
    return x**3 - 2*x**2 + 4*x - 1

def main():
    miejsce_zerowe_sinus = bisekcja(math.sin, -1.5, 1, 0.001)
    print(f"Miejsce zerowe funkcji sinus w przedziale (-1.5, 1): {miejsce_zerowe_sinus}")
    
    miejsce_zerowe_wielomian = bisekcja(wielomian, -10, 10, 0.001)
    print(f"Miejsce zerowe wielomianu w przedziale (-10, 10): {miejsce_zerowe_wielomian}")

main()

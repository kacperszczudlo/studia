#ukonczono

import math

def oblicz_pola(*figury):
    pola = {}
    
    for figura in figury:
        nazwa = figura[0]
        dane = figura[1:]
        pole = 0
        
        if nazwa == "koło":
            promien = dane[0]
            pole = math.pi * promien ** 2
        elif nazwa == "kwadrat":
            bok = dane[0]
            pole = bok ** 2
        elif nazwa == "prostokąt":
            bok1, bok2 = dane
            pole = bok1 * bok2
        elif nazwa == "trójkąt":
            podstawa, wysokosc = dane
            pole = 0.5 * podstawa * wysokosc
        else:
            print("Nie ma takiej figury")
            continue

        if nazwa not in pola:
            pola[nazwa] = []
        pola[nazwa].append(pole)
    
    return pola

def main():
    wyniki = oblicz_pola(
        ("koło", 3),
        ("koło", 4),
        ("kwadrat", 2),
        ("kwadrat", 3),
        ("prostokąt", 1, 2),
        ("trójkąt", 3, 4)
    )
    
    print(wyniki)

main()

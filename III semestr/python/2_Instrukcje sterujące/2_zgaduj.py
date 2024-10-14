#ukończono

import random

wylosowana = random.randint(1, 10)
proby = 3

while proby > 0:
    liczba = int(input("Podaj liczbę: "))
    if liczba == wylosowana:
        print(f"Gratulacje, zgadłeś liczbę {wylosowana}")
        break
    elif liczba > wylosowana:
        print("ZA DUŻA")
    else:
        print("ZA MAŁA")
    
    proby -= 1

else:
    print(f"Koniec gry! Wylosowana liczba to {wylosowana}.")

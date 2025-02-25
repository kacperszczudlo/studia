#ukończono

from abc import ABC, abstractmethod
import math

class Kształt(ABC):
    def __init__(self, nazwa):
        self.__nazwa = nazwa
    
    @property
    def nazwa(self):
        return self.__nazwa
    
    @abstractmethod
    def pole(self):
        pass

class Koło(Kształt):
    def __init__(self, nazwa, promień):
        super().__init__(nazwa)
        self.promień = promień
    
    def pole(self):
        return math.pi * self.promień ** 2

class Trójkąt(Kształt):
    def __init__(self, nazwa, bok_a, bok_b, bok_c):
        super().__init__(nazwa)
        self.bok_a = bok_a
        self.bok_b = bok_b
        self.bok_c = bok_c
    
    def pole(self):
        s = (self.bok_a + self.bok_b + self.bok_c) / 2
        return math.sqrt(s * (s - self.bok_a) * (s - self.bok_b) * (s - self.bok_c))

class Prostokąt(Kształt):
    def __init__(self, nazwa, bok_a, bok_b):
        super().__init__(nazwa)
        self.bok_a = bok_a
        self.bok_b = bok_b
    
    def pole(self):
        return self.bok_a * self.bok_b

class Kwadrat(Prostokąt):
    def __init__(self, nazwa, bok):
        super().__init__(nazwa, bok, bok)
        self.liczba_boków = 4

class TrójkątRównoboczny(Trójkąt):
    def __init__(self, nazwa, bok):
        super().__init__(nazwa, bok, bok, bok)
        self.liczba_boków = 3

class Bryła(Kształt):
    def __init__(self, nazwa, ściana, bok, liczba_ścian):
        super().__init__(nazwa)
        self.ściany = [ściana(nazwa, bok) for _ in range(liczba_ścian)]
    
    def pole(self):
        return sum(ściana.pole() for ściana in self.ściany)

class Platon:
    def wierzchołki(self):
        liczba_ścian = len(self.ściany)
        liczba_boków = self.ściany[0].liczba_boków
        liczba_wierzchołków = 2 - liczba_ścian + (liczba_ścian * liczba_boków) // 2
        return liczba_wierzchołków

class Czworościan(Bryła, Platon):
    def __init__(self, nazwa, bok):
        super().__init__(nazwa, TrójkątRównoboczny, bok, 4)

class Sześcian(Bryła, Platon):
    def __init__(self, nazwa, bok):
        super().__init__(nazwa, Kwadrat, bok, 6)

class Piramida(Bryła):
    def __init__(self, nazwa, bok):
        super().__init__(nazwa, TrójkątRównoboczny, bok, 4)
        self.ściany.append(Kwadrat(nazwa, bok))

def main():
    bryły = [
        Czworościan("Czworościan", 3),
        Sześcian("Sześcian", 4),
        Piramida("Piramida", 5)
    ]
    
    for bryła in bryły:
        print(f"{bryła.nazwa}: Pole = {bryła.pole():.2f}")
        if isinstance(bryła, Platon):
            print(f"  Wierzchołki = {bryła.wierzchołki()}")

main()

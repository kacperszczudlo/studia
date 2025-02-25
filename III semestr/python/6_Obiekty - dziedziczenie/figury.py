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

class TrójkątRównoboczny(Trójkąt):
    def __init__(self, nazwa, bok):
        super().__init__(nazwa, bok, bok, bok)

def main():
    figury = [
        Koło("Koło", 5),
        Trójkąt("Trójkąt", 3, 4, 5),
        Prostokąt("Prostokąt", 3, 4),
        Kwadrat("Kwadrat", 4),
        TrójkątRównoboczny("Trójkąt równoboczny", 6)
    ]
    
    for figura in figury:
        print(f"{figura.nazwa}: Pole = {figura.pole():.2f}")

main()
